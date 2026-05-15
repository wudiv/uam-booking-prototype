import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
      {/* 
        移动端：全屏铺满 (匹配 Stitch 原稿)
        桌面端：灰色背景居中显示 430x932 模拟器
      */}
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
            <Route path="/" element={<Home />} />
            <Route path="/route-comparison" element={<RouteComparison />} />
            <Route path="/flight-selection" element={<FlightSelection />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/shuttle-info" element={<ShuttleInfo />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
