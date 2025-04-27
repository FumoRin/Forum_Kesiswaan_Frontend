import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { columns } from "./tables/column";
import { DataTable } from "./tables/data-tables";
import { UserPlus } from "lucide-react"; 

import UserForm from "./formInput";
import DeleteUserDialog from "./user-crud/deleteUser"; // New import


export default function UserAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (userData) => {
    setCurrentUser(userData);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(user => user.id === userId);
    setUserToDelete(userToDelete);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = (userData) => {
    if (currentUser) {
      // Editing existing user
      setUsers(users.map(user => 
        user.id === currentUser.id ? { ...userData, id: user.id, updated_at: new Date().toISOString() } : user
      ));
    } else {
      // Adding new user
      const newUser = {
        ...userData,
        id: (Math.max(...users.map(user => parseInt(user.id))) + 1).toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No token found");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          } else if (response.status === 403) {
            throw new Error("Forbidden");
          } else {
            throw new Error("Failed to fetch users");
          }
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          error.message || "An error occurred while fetching users"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  })

  return (
    <div className="flex mt-navbar flex-col">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-t" />

      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage your users here.</p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleAddUser}>
            <UserPlus className="h-4 w-4" />
            Add New User
          </Button>
        </div>

        <div className="py-6">
          <DataTable 
            columns={columns(handleEditUser, handleDeleteUser)} 
            data={users} 
          />
        </div>
      </div>

      {/* User Form Dialog */}
      <UserForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        userData={currentUser}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setUserToDelete(null);
        }}
        onConfirmDelete={confirmDeleteUser}
        userName={userToDelete?.full_name}
      />
    </div>
  );
}