/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const SupperAdminPage = () => {
  const token = useSelector(useCurrentToken);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [updatedUserData, setUpdatedUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          "https://blind-date-withbook.vercel.app/api/auth/all",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setUsers(response.data.data);
        } else {
          console.log("No users data found in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setUpdatedUserData(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      if (!token || !selectedUser) return;

      await axios.put(
        `https://blind-date-withbook.vercel.app/api/auth/update/${selectedUser?._id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const response = await axios.get(
        "https://blind-date-withbook.vercel.app/api/auth/all",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Data</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user: any) => (
          <div
            key={user._id}
            className="p-4 border rounded-lg"
            onClick={() => handleUserSelect(user)}
            style={{ cursor: "pointer" }}
          >
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Password:</strong> {user.password}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Update User</h2>
          <input
            type="text"
            name="username"
            value={updatedUserData.username}
            placeholder="Username"
            onChange={handleInputChange}
            className="block w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            name="email"
            value={updatedUserData.email}
            placeholder="Email"
            onChange={handleInputChange}
            className="block w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            name="password"
            value={updatedUserData.password}
            placeholder="Password"
            onChange={handleInputChange}
            className="block w-full p-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            name="role"
            value={updatedUserData.role}
            placeholder="Role"
            onChange={handleInputChange}
            className="block w-full p-2 mb-2 border rounded-md"
          />
          <button
            onClick={handleUpdateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default SupperAdminPage;
