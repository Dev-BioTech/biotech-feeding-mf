import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  ChevronRight,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export function FeedingSchedule() {
  const [selectedDate] = useState(new Date());

  const schedule = [
    {
      id: "1",
      time: "06:00 AM",
      planName: "Plan Bovino Adulto - Alta Producción",
      location: "Establo A - Sector 1",
      status: "completed",
      assignedTo: "Juan P.",
    },
    {
      id: "2",
      time: "07:30 AM",
      planName: "Plan Terneros - Crecimiento",
      location: "Establo B - Sector Cras",
      status: "pending",
      assignedTo: "Maria L.",
    },
    {
      id: "3",
      time: "12:00 PM",
      planName: "Plan Bovino Adulto - Alta Producción",
      location: "Establo A - Sector 1",
      status: "pending",
      assignedTo: "Carlos R.",
    },
    {
      id: "4",
      time: "02:00 PM",
      planName: "Plan Porcino - Engorde",
      location: "Corral 3",
      status: "delayed",
      assignedTo: "Pedro S.",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-farm-green-600 bg-farm-green-100";
      case "pending":
        return "text-blue-600 bg-blue-100";
      case "delayed":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-farm-green-600" />;
      case "pending":
        return <Circle className="w-5 h-5 text-blue-600" />;
      case "delayed":
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "pending":
        return "Pendiente";
      case "delayed":
        return "Retrasado";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Image Banner */}
      <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl group bg-gradient-to-r from-farm-green-900 to-farm-green-700">
        <div 
          className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute inset-0 bg-farm-green-900/40 flex items-center justify-between p-8 md:p-12 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-roboto text-white mb-4">
              Horario de Alimentación
            </h1>
            <p className="text-farm-green-100 font-inter text-lg mb-8">
              Controla, asigna y monitorea la distribución de alimentos en
              tiempo real.
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-white font-inter">
                <p className="text-sm opacity-80 uppercase tracking-wider">Próxima ración</p>
                <p className="font-bold text-lg">12:00 PM</p>
              </div>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center justify-center gap-2 min-h-[44px] bg-white text-farm-green-900 hover:bg-farm-green-50 px-8 py-3 rounded-xl font-bold font-inter shadow-lg transition-all transform hover:scale-105"
          >
            <Calendar className="w-5 h-5 flex-shrink-0" />
            Nueva Agenda
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-farm-green-900 text-2xl font-bold mb-1">
            Agenda del Día
          </h2>
          <p className="text-farm-green-600">Raciones programadas para hoy</p>
        </motion.div>

        <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
          <button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-farm-green-50 rounded-xl text-farm-green-600 transition-colors cursor-pointer">
            <Calendar className="w-5 h-5 mx-auto" />
          </button>
          <span className="font-medium font-inter text-farm-green-900 pr-3">
            {selectedDate.toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-farm-green-50/30 border border-transparent hover:border-farm-green-200 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Timeline Connector Line */}
                {index !== schedule.length - 1 && (
                  <div className="absolute left-[3.2rem] top-[4.5rem] bottom-[-1.5rem] w-0.5 bg-gray-100 group-hover:bg-farm-green-100 transition-colors -z-10" />
                )}

                <div className="flex flex-col items-center min-w-[80px]">
                  <span className="text-lg font-bold text-farm-green-900">
                    {item.time.split(" ")[0]}
                  </span>
                  <span className="text-sm text-farm-green-600 font-medium">
                    {item.time.split(" ")[1]}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-100 group-hover:border-farm-green-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform relative z-10">
                  {getStatusIcon(item.status)}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-farm-green-700 transition-colors">
                    {item.planName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 group-hover:bg-white transition-colors">
                      <Clock className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>

                <div className="text-right hidden md:block px-4 border-l border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Asignado a
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs flex items-center justify-center font-bold">
                      {item.assignedTo.split(" ")[0][0]}
                      {item.assignedTo.split(" ")[1]?.[0]}
                    </div>
                    <p className="font-medium text-gray-700">
                      {item.assignedTo}
                    </p>
                  </div>
                </div>

                <div className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white text-gray-300 group-hover:text-farm-green-500 transition-colors cursor-pointer">
                  <ChevronRight className="w-5 h-5 mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedingSchedule;
