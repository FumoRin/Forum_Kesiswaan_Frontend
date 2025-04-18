import { useState } from "react";

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

const dummyData = [
  // Original entries
  {
    id: "1",
    email: "john.doe@example.com",
    role: "admin",
    no_hp: "08123456789",
    full_name: "John Doe",
    school: "High School A",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    role: "user",
    no_hp: "08123456790",
    full_name: "Jane Smith",
    school: "High School B",
    created_at: "2023-01-02T00:00:00Z",
    updated_at: "2023-01-02T00:00:00Z",
  },
  {
    id: "3",
    email: "alice.jones@example.com",
    role: "user",
    no_hp: "08123456791",
    full_name: "Alice Jones",
    school: "High School C",
    created_at: "2023-01-03T00:00:00Z",
    updated_at: "2023-01-03T00:00:00Z",
  },
  {
    id: "4",
    email: "michael.brown@example.com",
    role: "user",
    no_hp: "08123456792",
    full_name: "Michael Brown",
    school: "High School D",
    created_at: "2023-01-04T00:00:00Z",
    updated_at: "2023-01-04T00:00:00Z",
  },
  {
    id: "5",
    email: "emily.davis@example.com",
    role: "admin",
    no_hp: "08123456793",
    full_name: "Emily Davis",
    school: "High School E",
    created_at: "2023-01-05T00:00:00Z",
    updated_at: "2023-01-05T00:00:00Z",
  },
  {
    id: "6",
    email: "robert.wilson@example.com",
    role: "user",
    no_hp: "08123456794",
    full_name: "Robert Wilson",
    school: "High School F",
    created_at: "2023-01-06T00:00:00Z",
    updated_at: "2023-01-06T00:00:00Z",
  },
  {
    id: "7",
    email: "sarah.johnson@example.com",
    role: "user",
    no_hp: "08123456795",
    full_name: "Sarah Johnson",
    school: "High School G",
    created_at: "2023-01-07T00:00:00Z",
    updated_at: "2023-01-07T00:00:00Z",
  },
  {
    id: "8",
    email: "david.miller@example.com",
    role: "user",
    no_hp: "08123456796",
    full_name: "David Miller",
    school: "High School H",
    created_at: "2023-01-08T00:00:00Z",
    updated_at: "2023-01-08T00:00:00Z",
  },
  {
    id: "9",
    email: "linda.garcia@example.com",
    role: "user",
    no_hp: "08123456797",
    full_name: "Linda Garcia",
    school: "High School I",
    created_at: "2023-01-09T00:00:00Z",
    updated_at: "2023-01-09T00:00:00Z",
  },
  {
    id: "10",
    email: "james.rodriguez@example.com",
    role: "admin",
    no_hp: "08123456798",
    full_name: "James Rodriguez",
    school: "High School J",
    created_at: "2023-01-10T00:00:00Z",
    updated_at: "2023-01-10T00:00:00Z",
  },
  {
    id: "11",
    email: "patricia.martinez@example.com",
    role: "user",
    no_hp: "08123456799",
    full_name: "Patricia Martinez",
    school: "High School K",
    created_at: "2023-01-11T00:00:00Z",
    updated_at: "2023-01-11T00:00:00Z",
  },
];

export default function UserAdmin() {
  const [users, setUsers] = useState(dummyData);
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