import React, { useState, useEffect } from "react";
import { Plus, Calendar, Search, Trash2 } from "lucide-react";
import alertService from "@shared/utils/alertService";
import { useAuthStore } from "@shared/store/authStore";
import { useFeedingStore } from "@shared/store/feedingStore";
import { FeedingEventForm } from "./FeedingEventForm";
import { SkeletonList } from "../../../components/ui/Skeleton";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";

export function FeedingEventsList() {
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  const farmId = useAuthStore((s) => s.selectedFarm?.id);
  const events = useFeedingStore((s) => s.events);
  const loading = useFeedingStore((s) => s.loading);
  const error = useFeedingStore((s) => s.error);
  const fetchEventsByFarm = useFeedingStore((s) => s.fetchEventsByFarm);
  const cancelEventInStore = useFeedingStore((s) => s.cancelEvent);

  useEffect(() => {
    fetchEventsByFarm(farmId);
  }, [farmId, fetchEventsByFarm]);

  const filteredEvents = (events ?? []).filter(
    (e) =>
      e.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.animalName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateSuccess = () => {
    setViewMode("list");
    fetchEventsByFarm(farmId);
    alertService.success("Registro de alimentación creado con éxito", "Éxito");
  };

  const handleCancelEvent = async (id) => {
    try {
      await cancelEventInStore(id, farmId);
      alertService.success("Evento cancelado", "Éxito");
    } catch {
      alertService.error("Error al cancelar evento", "Error");
    }
  };

  if (viewMode === "create") {
    return (
      <FeedingEventForm
        farmId={farmId}
        onCancel={() => setViewMode("list")}
        onSuccess={handleCreateSuccess}
      />
    );
  }

  if (!farmId) {
    return (
      <EmptyState 
        title="Seleccione una granja" 
        description="Por favor, selecciona una granja para ver el historial de alimentación." 
        actionLabel={null}
        icon={Calendar}
      />
    );
  }

  const refetch = () => fetchEventsByFarm(farmId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-farm-green-100">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold font-roboto text-farm-green-900">
            Historial de Alimentación
          </h2>
          <p className="text-gray-500 font-inter">Registro de eventos de consumo</p>
        </div>
        <button
          onClick={() => setViewMode("create")}
          className="flex items-center justify-center gap-2 bg-farm-green-600 text-white min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl font-bold font-inter hover:bg-farm-green-700 transition-all shadow-lg shadow-farm-green-200 w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          Registrar Evento
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por producto o animal..."
          className="w-full pl-12 pr-4 py-3 min-h-[44px] rounded-xl border border-gray-200 focus:ring-2 focus:ring-farm-green-500 focus:border-transparent outline-none transition-all font-inter"
        />
      </div>

      {/* Loading/Error/List */}
      {loading ? (
        <SkeletonList count={4} />
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center min-h-[44px] flex flex-col items-center justify-center border border-red-100">
          <span className="font-bold text-lg mb-2">Ha ocurrido un error</span>
          <p className="mb-4">{error}</p>
          <button onClick={refetch} className="underline font-medium hover:text-red-700 min-h-[44px] min-w-[44px] px-6 py-2 bg-red-100 rounded-lg">
            Reintentar
          </button>
        </div>
      ) : filteredEvents.length === 0 ? (
        <EmptyState 
          title="Sin registros" 
          description="No hemos encontrado registros para esta granja o búsqueda."
          actionLabel="+ Registrar Nuevo Evento"
          onAction={() => setViewMode("create")}
          icon={Calendar}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:shadow-md transition-all md:h-[96px]"
            >
              <div className="flex items-start md:items-center gap-4">
                <div className="p-3 bg-farm-green-50 rounded-xl text-farm-green-600 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-roboto text-lg text-gray-900 leading-tight">
                    {event.productName || "Producto desconocido"}
                  </h3>
                  <p className="text-sm text-gray-500 font-inter mt-1">
                    {new Date(event.date).toLocaleDateString()} &bull;{" "}
                    {event.animalName
                      ? `Animal: ${event.animalName}`
                      : `Lote: ${event.batchName || "N/A"}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                <div className="text-left md:text-right">
                  <span className="block font-bold text-lg text-farm-green-700">
                    {event.quantity} kg
                  </span>
                  <span className="text-xs text-gray-400 font-inter uppercase tracking-wider">Cantidad</span>
                </div>
                <div className="text-left md:text-right">
                  <span className="block font-bold text-lg text-gray-700">
                    ${event.cost || 0}
                  </span>
                  <span className="text-xs text-gray-400 font-inter uppercase tracking-wider">Costo</span>
                </div>
                <ConfirmDialog
                  title="Confirmar Cancelación"
                  description="Esta acción no se puede deshacer. ¿Deseas cancelar definitivamente este evento?"
                  confirmText="Sí, Cancelar"
                  cancelText="No, Mantener"
                  variant="danger"
                  onConfirm={() => handleCancelEvent(event.id)}
                  trigger={
                    <button
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                      title="Cancelar evento"
                    >
                      <Trash2 className="w-5 h-5 mx-auto" />
                    </button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
