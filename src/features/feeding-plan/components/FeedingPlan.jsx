import { useState } from "react";
import { Search, Plus, Utensils, Edit2, Trash2, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFeedingStore } from "@shared/store/feedingStore";
import alertService from "@shared/utils/alertService";
import { FeedingPlanForm } from "./FeedingPlanForm";
import { FeedingPlanDetail } from "./FeedingPlanDetail";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";

export function FeedingPlans() {
  const plans = useFeedingStore((state) => state.plans);
  const deletePlan = useFeedingStore((state) => state.deletePlan);

  const [viewMode, setViewMode] = useState("list"); // 'list', 'create', 'edit', 'view'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Derived state
  const filteredPlans = plans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.animalType.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getTypeColor = (type) => {
    switch (type) {
      case "Bovino":
        return "bg-blue-100 text-blue-700";
      case "Porcino":
        return "bg-pink-100 text-pink-700";
      case "Ovino":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handlers
  const handleCreate = () => {
    setSelectedPlan(null);
    setViewMode("create");
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setViewMode("edit");
  };

  const handleView = (plan) => {
    setSelectedPlan(plan);
    setViewMode("view");
  };

  const handleDelete = (id) => {
    deletePlan(id);
    alertService.success(
      "Plan de alimentación eliminado correctamente",
      "Éxito",
    );
  };

  const handleBack = () => {
    setViewMode("list");
    setSelectedPlan(null);
  };

  const handleSave = () => {
    setViewMode("list");
    setSelectedPlan(null);
  };

  // Render Content based on View Mode
  if (viewMode === "create" || viewMode === "edit") {
    return (
      <FeedingPlanForm
        planToEdit={selectedPlan}
        onCancel={handleBack}
        onSave={handleSave}
      />
    );
  }

  if (viewMode === "view") {
    return (
      <FeedingPlanDetail
        plan={selectedPlan}
        onBack={handleBack}
        onEdit={(plan) => handleEdit(plan)}
      />
    );
  }

  return (
    <div className="space-y-8 relative">
      {/* Header SVG Banner */}
      <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl group bg-gradient-to-r from-farm-green-800 to-farm-green-600">
        <div 
          className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute inset-0 flex items-center justify-end p-8 opacity-10">
           <Utensils className="w-64 h-64 text-white -mr-16 rotate-12" />
        </div>
        <div className="absolute inset-0 flex items-center p-8 md:p-12 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-roboto text-white mb-4 leading-tight">
              Gestión Nutricional
            </h1>
            <p className="text-farm-green-100 font-inter text-lg mb-8 max-w-md">
              Optimiza la salud y productividad de tu ganado con planes de
              alimentación balanceados.
            </p>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 min-h-[44px] bg-white text-farm-green-900 hover:bg-farm-green-50 px-8 py-3 rounded-xl font-bold font-inter shadow-lg transition-transform transform hover:scale-105 w-full md:w-auto"
            >
              <Plus className="w-5 h-5 flex-shrink-0" />
              Crear Nuevo Plan
            </button>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-farm-green-100"
      >
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o tipo..."
            className="w-full pl-12 pr-4 py-3 min-h-[44px] font-inter bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-farm-green-500 focus:bg-white transition-all"
          />
        </div>
        <div className="text-sm font-medium font-inter text-gray-500 w-full md:w-auto text-center md:text-right">
          Mostrando{" "}
          <span className="text-farm-green-700 font-bold text-lg">
            {filteredPlans.length}
          </span>{" "}
          planes activos
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg hover:border-farm-green-200 transition-all group flex flex-col h-full"
          >
            {/* Card Header */}
            <div className="bg-farm-green-500 p-6 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                <Utensils className="w-24 h-24 text-white rotate-12" />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-roboto text-lg md:text-xl leading-tight mb-1">
                      {plan.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-inter bg-black/20 text-white backdrop-blur-sm">
                      {plan.ageGroup}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex flex-col justify-center">
                  <p className="text-gray-500 text-xs font-inter uppercase tracking-wider mb-1">
                    Tipo
                  </p>
                  <span
                    className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold font-inter rounded-md ${getTypeColor(
                      plan.animalType,
                    )} w-max`}
                  >
                    {plan.animalType}
                  </span>
                </div>
                <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 flex flex-col justify-center">
                  <p className="text-gray-500 text-xs font-inter uppercase tracking-wider mb-1">
                    Raciones
                  </p>
                  <p className="text-gray-900 font-bold font-inter text-lg">
                    {plan.feedsPerDay}/día
                  </p>
                </div>
                <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 flex flex-col justify-center">
                  <p className="text-gray-500 text-xs font-inter uppercase tracking-wider mb-1">
                    Total
                  </p>
                  <p className="text-gray-900 font-bold font-inter text-lg">{plan.totalDaily}</p>
                </div>
                <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 flex flex-col justify-center">
                  <p className="text-gray-500 text-xs font-inter uppercase tracking-wider mb-1">
                    Costo
                  </p>
                  <p className="text-gray-900 font-bold font-inter text-lg">{plan.cost}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-4 border-t border-gray-100 shrink-0">
                <button
                  onClick={() => handleView(plan)}
                  className="flex-1 min-w-[120px] min-h-[44px] flex items-center justify-center gap-2 bg-farm-green-50 hover:bg-farm-green-100 text-farm-green-700 px-4 py-3 rounded-xl font-medium font-inter transition-colors group-hover:bg-farm-green-600 group-hover:text-white"
                >
                  <Eye className="w-5 h-5 flex-shrink-0" />
                  Ver Detalles
                </button>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 sm:flex-none flex items-center justify-center min-w-[44px] min-h-[44px] p-3 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-xl transition-colors border border-gray-200 hover:border-blue-200"
                    title="Editar"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <ConfirmDialog
                    title="¿Eliminar Plan?"
                    description="Esta acción no se puede deshacer. ¿Deseas eliminar este plan de alimentación?"
                    confirmText="Sí, Eliminar"
                    cancelText="Cancelar"
                    variant="danger"
                    onConfirm={() => handleDelete(plan.id)}
                    trigger={
                      <button
                        className="flex-1 sm:flex-none flex items-center justify-center min-w-[44px] min-h-[44px] p-3 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-xl transition-colors border border-gray-200 hover:border-red-200"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FeedingPlans;
