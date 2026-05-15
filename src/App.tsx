import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MobileWrapper } from './components/MobileWrapper';
import { Home } from './pages/Home';
import { RouteComparison } from './pages/RouteComparison';
import { FlightSelection } from './pages/FlightSelection';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ShuttleInfo } from './pages/ShuttleInfo';
import { Questionnaire } from './pages/Questionnaire';
import { BookingSuccess } from './pages/BookingSuccess';

export default function App() {
  return (
    <Router>
      {/* 桌面端：灰色背景居中显示模拟器；手机端：无 padding 无背景直接铺满 */}
      <div className="w-full min-h-[100dvh]
                      max-sm:bg-background max-sm:p-0
                      sm:bg-gray-100 sm:flex sm:items-center sm:justify-center sm:p-4">
        <MobileWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/route-comparison" element={<RouteComparison />} />
            <Route path="/flight-selection" element={<FlightSelection />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/shuttle-info" element={<ShuttleInfo />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MobileWrapper>
      </div>
    </Router>
  );
}
