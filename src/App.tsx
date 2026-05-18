import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/user/HomePage";
import { CartProvider } from "./context/CartContext";
import UserLogin from "./pages/user/auth/UserLogin";
import UserRegister from "./pages/user/auth/UserRegister";
import PublicCatalog from "./pages/user/products/PublicCatalog";
import ProductDetail from "./pages/user/products/ProductDetail";
import ContactUs from "./pages/user/ContactUs";
import UserProfile from "./pages/user/UserProfile";
import PrivacyPolicy from "./pages/user/legal/PrivacyPolicy";
// import CheckoutPage from "./pages/user/CheckoutPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import AdminUsersList from "./pages/admin/AdminUserList";
import OrderPage from "./pages/user/OrderPage";
import RequestReturn from "./pages/user/RequestReturn";
import RefundPolicy from "./pages/user/RefundPolicy";
import ShippingPolicy from "./pages/user/ShippingPolicy";
import HelpCenter from "./pages/user/HelpCenter";
import TermsOfService from "./pages/user/TermsOfService";
import FAQPage from "./pages/user/FAQPage";
import CartPage from "./pages/user/CartPage";
import PaymentPage from "./pages/user/PaymentPage";
import AdminProductStock from "./pages/admin/AdminProductStock";
import TrackingPage from "./pages/user/TrackingPage";
import TransactionPage from "./pages/admin/TransactionPage";
import TransactionDetailPage from "./pages/admin/TransactionDetailPage";
import SalesReportPage from "./pages/admin/SalesReportPage";
import PaymentSuccessPage from "./pages/user/PaymentSuccessPage";
import InactiveProductPage from "./pages/admin/InactiveProductPage";
import SubscriberPage from "./pages/admin/SubscriberPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import MessageViewPage from "./pages/admin/MessageViewPage";
import DetailMessageViewPage from "./pages/admin/DetailMessageViewPage";
import FavoritePage from "./pages/user/FavoritePage";
import CategoryCoaPage from "./pages/admin/CategoryCoaPage";
import CoaPage from "./pages/admin/CoaPage";
import TransferReceivePage from "./pages/admin/TransferReceivePage";
import SupplierPage from "./pages/admin/SupplierPage";
import InvoicePage from "./pages/admin/InvoicePage";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import ConsultWithUs from "./pages/user/ConsultWithUs";
import AdminTreatments from "./pages/admin/AdminTreatments";
import ForgotPasswordPage from "./pages/user/auth/ForgotPasswordPage";
import CodeVerificationPage from "./pages/user/auth/CodeVerificationPage";
import ResetPasswordPage from "./pages/user/auth/ResetPasswordPage";
import AdminForgotPasswordPage from "./pages/admin/AdminForgotPasswordPage";
import AdminCodeVerificationPage from "./pages/admin/AdminCodeVerificationPage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import AdminReviews from "./pages/admin/AdminReviews";
import ChatListPage from "./pages/user/ChatListPage";
import UserDetailPage from "./pages/admin/UserDetailPage";
import AdminAuditLogPage from "./pages/admin/AdminAuditLogPage";
import { MessageProvider } from "./context/MessageContext";
import ProductOnePage from "./pages/user/ProductOnePage";
import ProductTwoPage from "./pages/user/ProductTwoPage";
import AboutUsPage from "./pages/user/AboutUsPage";
import AdminEventList from "./pages/admin/AdminEventList";
import AdminEventForm from "./pages/admin/AdminEventForm";
import AdminEventDetail from "./pages/admin/AdminEventDetail";
import EventPage from "./pages/user/EventPage";
import { LanguageProvider } from "./context/LanguageContext";

// function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const location = useLocation();
//   const isAdminArea = location.pathname.startsWith("/admin");
//   const isAuthPage =
//     location.pathname === "/login" || location.pathname === "/register";

//   // Jika ini area admin, LayoutWrapper murni me-return children tanpa Header/Footer publik
//   if (isAdminArea) return <>{children}</>;

//   const shouldShowHeaderFooter = !isAuthPage;

//   return (
//     <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
//       {shouldShowHeaderFooter && <Header />}
//       <main className="flex flex-col flex-1">{children}</main>
//       {shouldShowHeaderFooter && <Footer />}
//       {/* LETAKKAN WHATSAPP BUTTON DI SINI!
//           Ia akan muncul melayang di semua halaman public (selain admin)
//       */}
//       <WhatsAppButton />
//     </div>
//   );
// }

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");

  // [PERBAIKAN] Buat array berisi semua rute yang tidak boleh menampilkan Header/Footer
  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-code",
    "/reset-password",
  ];

  // Cek apakah pathname saat ini ada di dalam array authPaths
  const isAuthPage = authPaths.includes(location.pathname);

  // Jika ini area admin, LayoutWrapper murni me-return children tanpa Header/Footer publik
  if (isAdminArea) return <>{children}</>;

  const shouldShowHeaderFooter = !isAuthPage;

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      {shouldShowHeaderFooter && <Header />}

      <main className="flex flex-col flex-1">{children}</main>

      {shouldShowHeaderFooter && <Footer />}

      {/* Tombol WhatsApp Floating juga hanya muncul jika Header/Footer muncul */}
      {shouldShowHeaderFooter && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MessageProvider>
          <Router>
            {/* LETAKKAN DI SINI! 
        Setiap kali URL berubah, komponen ini akan mereset scroll ke atas 
      */}
            <ScrollToTop />
            <LayoutWrapper>
              <Routes>
                {/* ========================================== */}
                {/* RUTE USER PUBLIK & AUTENTIKASI */}
                {/* ========================================== */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegister />} />

                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/verify-code" element={<CodeVerificationPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                {/* <-- Tambahkan ini */}
                <Route path="/profile" element={<UserProfile />} />
                {/* Rute Produk */}
                <Route path="/products" element={<PublicCatalog />} />
                {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/legal/privacy" element={<PrivacyPolicy />} />
                <Route path="/returns/request" element={<RequestReturn />} />
                <Route path="/policies/refund" element={<RefundPolicy />} />
                <Route path="/policies/shipping" element={<ShippingPolicy />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/legal/terms" element={<TermsOfService />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/cart" element={<CartPage />} />
                {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
                <Route path="/checkout" element={<PaymentPage />} />
                <Route
                  path="/payment-success"
                  element={<PaymentSuccessPage />}
                />
                <Route path="/tracking/:id" element={<TrackingPage />} />
                <Route path="/favorites" element={<FavoritePage />} />
                <Route path="/consult" element={<ConsultWithUs />} />
                <Route path="/product-one" element={<ProductOnePage />} />
                <Route path="/product-two" element={<ProductTwoPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/events" element={<EventPage />} />
                {/* Tambahkan Route lainnya (profile, checkout, dll) di sini nanti */}
                {/* --- RUTE KHUSUS ADMIN --- */}
                {/* Semua rute admin dibungkus manual menggunakan element AdminLayout */}
                <Route
                  path="/admin/categories"
                  element={
                    <AdminLayout>
                      <AdminCategories />
                    </AdminLayout>
                  }
                />
                <Route path="/chat" element={<ChatListPage />} />
                {/* --- RUTE KHUSUS ADMIN --- */}
                {/* <Route
              path="/admin/login"
              element={
                <AdminLayout>
                  <AdminLogin />
                </AdminLayout>
              }
            /> */}
                <Route
                  path="/admin/forgot-password"
                  element={
                    // <AdminLayout>
                    <AdminForgotPasswordPage />
                    // </AdminLayout>
                  }
                />
                <Route
                  path="/admin/verify-code"
                  element={
                    // <AdminLayout>
                    <AdminCodeVerificationPage />
                    // </AdminLayout>
                  }
                />
                <Route
                  path="/admin/reset-password"
                  element={
                    // <AdminLayout>
                    <AdminResetPasswordPage />
                    // </AdminLayout>
                  }
                />
                <Route
                  path="/admin/login"
                  element={
                    <AdminLayout>
                      <AdminLogin />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminLayout>
                      <AdminProducts />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/products/create"
                  element={
                    <AdminLayout>
                      <AddProduct />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/products/:slug/edit"
                  element={
                    <AdminLayout>
                      <EditProduct />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/products/:slug"
                  element={
                    <AdminLayout>
                      <AdminProductDetail />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/stocks"
                  element={
                    <AdminLayout>
                      <AdminProductStock />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/transactions"
                  element={
                    <AdminLayout>
                      <TransactionPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/transactions/:id"
                  element={
                    <AdminLayout>
                      <TransactionDetailPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminLayout>
                      <AdminUsersList />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/sales-report"
                  element={
                    <AdminLayout>
                      <SalesReportPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/products/inactive"
                  element={
                    <AdminLayout>
                      <InactiveProductPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/subscribers"
                  element={
                    <AdminLayout>
                      <SubscriberPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/profile"
                  element={
                    <AdminLayout>
                      <AdminProfilePage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/messages"
                  element={
                    <AdminLayout>
                      <MessageViewPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/messages/:id"
                  element={
                    <AdminLayout>
                      <DetailMessageViewPage />
                    </AdminLayout>
                  }
                />
                {/* Accounting */}
                <Route
                  path="/admin/category-coas"
                  element={
                    <AdminLayout>
                      <CategoryCoaPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/coas"
                  element={
                    <AdminLayout>
                      <CoaPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/transfer-receive"
                  element={
                    <AdminLayout>
                      <TransferReceivePage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/suppliers"
                  element={
                    <AdminLayout>
                      <SupplierPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/invoices"
                  element={
                    <AdminLayout>
                      <InvoicePage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/treatments"
                  element={
                    <AdminLayout>
                      <AdminTreatments />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/reviews"
                  element={
                    <AdminLayout>
                      <AdminReviews />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/users/:id"
                  element={
                    <AdminLayout>
                      <UserDetailPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/audit-logs"
                  element={
                    <AdminLayout>
                      <AdminAuditLogPage />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <AdminLayout>
                      <AdminEventList />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/events/create"
                  element={
                    <AdminLayout>
                      <AdminEventForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/events/edit/:id"
                  element={
                    <AdminLayout>
                      <AdminEventForm />
                    </AdminLayout>
                  }
                />
                <Route
                  path="/admin/events/:id"
                  element={
                    <AdminLayout>
                      <AdminEventDetail />
                    </AdminLayout>
                  }
                />
                {/* Contoh untuk nanti jika ingin menambah Dashboard/Login Admin:
            <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            */}
              </Routes>
            </LayoutWrapper>
          </Router>
        </MessageProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
