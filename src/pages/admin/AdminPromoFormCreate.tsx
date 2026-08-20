import { useNavigate } from "react-router-dom";
import AdminPromoForm from "./AdminPromoForm";

export default function AdminPromoFormCreate() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <AdminPromoForm 
        promoId={null} 
        onSuccess={() => navigate("/admin/dynamic-promos")} 
        onCancel={() => navigate("/admin/dynamic-promos")} 
      />
    </div>
  );
}