import { useNavigate, useParams } from "react-router-dom";
import AdminPromoForm from "./AdminPromoForm";

export default function AdminPromoFormEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <AdminPromoForm 
        promoId={id} 
        onSuccess={() => navigate("/admin/dynamic-promos")} 
        onCancel={() => navigate("/admin/dynamic-promos")} 
      />
    </div>
  );
}