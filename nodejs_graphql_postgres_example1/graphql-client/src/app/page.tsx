"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ variables: { name, email } });
    setName("");
    setEmail("");
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.users.map((user: { id: string; name: string; email: string }) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
