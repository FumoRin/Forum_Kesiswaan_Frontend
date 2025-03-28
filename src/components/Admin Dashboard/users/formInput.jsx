import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import AddUserForm from "./user-crud/addUser"; // Import the component we created above

const UserForm = ({ isOpen, onClose, userData = null, onSubmit }) => {
  const [formData, setFormData] = useState(
    userData || {
      email: "",
      full_name: "",
      no_hp: "",
      role: "user",
      school: "",
    }
  );
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.full_name) {
      newErrors.full_name = "Full name is required";
    }
    
    if (!formData.no_hp) {
      newErrors.no_hp = "Phone number is required";
    }
    
    if (!formData.school) {
      newErrors.school = "School is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle>{userData ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <AddUserForm
            id="email"
            label="Email Address"
            type="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            required={true}
            error={errors.email}
          />
          
          <AddUserForm
            id="full_name"
            label="Full Name"
            placeholder="John Doe"
            value={formData.full_name}
            onChange={handleChange}
            required={true}
            error={errors.full_name}
          />
          
          <AddUserForm
            id="no_hp"
            label="Phone Number"
            placeholder="08123456789"
            value={formData.no_hp}
            onChange={handleChange}
            required={true}
            error={errors.no_hp}
          />
          
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              Role <span className="text-red-500">*</span>
            </Label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <AddUserForm
            id="school"
            label="School"
            placeholder="High School Name"
            value={formData.school}
            onChange={handleChange}
            required={true}
            error={errors.school}
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {userData ? "Update User" : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;