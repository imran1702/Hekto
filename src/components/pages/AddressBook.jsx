import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { v4 as uuid } from "uuid";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    type: "Home",
  });

  const userId = "test-user-123"; // Replace with Firebase Auth UID

  const colRef = collection(db, "users", userId, "addresses");

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      setAddresses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  const handleSave = async () => {
    await addDoc(colRef, {
      ...form,
      createdAt: new Date(),
    });
    setForm({
      name: "",
      phone: "",
      altPhone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      type: "Home",
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", userId, "addresses", id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Addresses</h1>

      {/* Address Form */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="p-3 border rounded-xl"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="Alternate Phone"
            value={form.altPhone}
            onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="Street Address"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="State/Region"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
          />

          <input
            className="p-3 border rounded-xl"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>

        <select
          className="p-3 border rounded-xl"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Home</option>
          <option>Office</option>
          <option>Other</option>
        </select>

        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700"
        >
          Save Address
        </button>
      </div>

      {/* Address List */}
      <div className="mt-6 space-y-4">
        {addresses.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded-xl shadow flex justify-between">
            <div>
              <p className="font-bold">{a.name}</p>
              <p className="text-gray-600">{a.phone}</p>
              <p className="text-gray-600">{a.street}, {a.city}</p>
              <p className="text-gray-600">{a.state} - {a.zip}</p>
              <p className="text-sm text-indigo-600">{a.type}</p>
            </div>

            <button
              onClick={() => handleDelete(a.id)}
              className="text-red-500 font-medium hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
