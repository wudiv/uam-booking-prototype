import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { RouteComparison } from './pages/RouteComparison';
import { FlightSelection } from './pages/FlightSelection';
import { SeatSelection } from './pages/SeatSelection';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ShuttleInfo } from './pages/ShuttleInfo';
import { Questionnaire } from './pages/Questionnaire';
import { useBookingStore, type ExperimentGroup } from './store/useBookingStore';

function AppContent() {
  const setExperimentalGroup = useBookingStore(state => state.setExperimentalGroup);

  useEffect(() => {
    // 从 localStorage 读取（由 index.html inline script 在页面加载时写入）
    try {
      const saved = localStorage.getItem('uam-experiment-group');
      if (saved !== null) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num >= 0 && num <= 7) {
          setExperimentalGroup(num as ExperimentGroup);
        }
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="
      max-sm:fixed max-sm:inset-0
      sm:min-h-screen sm:bg-gray-100 sm:flex sm:items-center sm:justify-center sm:p-4
      bg-background overflow-hidden
    ">
      <div className="
        max-sm:fixed max-sm:inset-0
        sm:relative sm:w-[430px] sm:h-[min(932px,90dvh)] sm:rounded-[40px] sm:shadow-2xl sm:border sm:border-gray-200
        bg-background overflow-hidden
      ">
        <Routes>
          {/* 7页主流程 */}
          <Route path="/" element={<Home />} />
          <Route path="/route-comparison" element={<RouteComparison />} />
          <Route path="/flight-selection" element={<FlightSelection />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/shuttle-info" element={<ShuttleInfo />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
