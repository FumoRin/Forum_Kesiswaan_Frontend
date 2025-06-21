import { useEffect, useState } from "react";
import { useAuth } from "@/components/utils/authProvider";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { columns } from "./tables/column";
import { DataTable } from "./tables/data-tables";
import { UserPlus } from "lucide-react";

import UserForm from "./formInput";
import DeleteUserDialog from "./user-crud/deleteUser";


export default function UserAdmin() {
  const { token } = useAuth();
  const { toast } = useToast();

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
    if (!userToDelete) return;

    setUserToDelete(userToDelete);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete || !token) return;

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to Delete User: ${response.statusText}`);
      }

      setUsers(users.filter(user => user.id !== userToDelete.id));

      toast({
        title: "Success",
        description: `User "${userToDelete.full_name}" deleted successfully`,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message || "An error occurred while deleting user");
      toast({
        title: "Error",
        description: error.message || "An error occurred while deleting user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = async (userData) => {
    if (!token) {
      setError("No token found");
      return;
    }

    setIsLoading(true);

    try {
      let url = "http://localhost:3000/users";
      let method = "POST";

      // API request based on add or update
      if (currentUser) {
        url = `${url}/${currentUser.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method === "POST" ? "create" : "update"} user: ${response.statusText}`);
      }

      const result = await response.json();

      if (currentUser) {
        setUsers(users.map(user =>
          user.id === currentUser.id ? result : user
        ));
        toast({
          title: "Success!",
          description: `User "${result.full_name}" has been updated`
        });
      } else {
        setUsers([...users, result]);
        toast({
          title: "Success",
          description: `User "${result.full_name}" has been created`
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.log(`Error ${currentUser ? 'updating' : 'creating'} user: `, error);
      setError(error.message || `An error occurred while ${currentUser ? 'updating' : 'creating'} user`);
      toast({
        title: "Error",
        description: error.message || `An error occurred while ${currentUser ? 'updating' : 'creating'} user`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };


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
      toast({
        title: "Error",
        description: error.message || "An error occurred while fetching users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

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