"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ 
    email: "", 
    name: "" ,
    phoneNo: "" ,
    yearAndDept: "" ,
    clgName: "" ,
    why: "" ,
  
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to subscribe");

      setStatus("success");
      setFormData({ email: "", name: "" ,phoneNo: "" ,
        yearAndDept: "" ,
        clgName: "" ,
        why: "" 
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
 
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full rounded-2xl shadow-xl p-8 space-y-6 border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black bg-clip-text ">
            Code Craft Daily
          </h1>
          <p className="text-gray-600 mt-2">Join the Coding Challenge !</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Bob"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone No:</label>
            <input
              type="tel"
              minLength={10}
              placeholder="123456789"
              required
              value={formData.phoneNo}
              onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year and Dept:</label>
            <input
              type="text"
              placeholder="1st Year BE CSE"
              required
              value={formData.yearAndDept}
              onChange={(e) => setFormData({ ...formData, yearAndDept: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College Name:</label>
            <input
              type="text"
              placeholder="Your College/University Name:"
              required
              value={formData.clgName}
              onChange={(e) => setFormData({ ...formData, clgName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join this Challenge ?:</label>
            <input
              type="text"
              
              required
              value={formData.why}
              onChange={(e) => setFormData({ ...formData, why: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>


          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-black  text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-black-200 hover:to-black-700 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {status === "loading" ? "Subscribing..." : "Join"}
          </button>
        </form>

        {status === "success" && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 font-medium">✅ Success!</p>
            <p className="text-green-700 text-sm mt-1">
              Check your mail !
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 font-medium">❌ Error occurred , Try again later</p>
            
          </div>
        )}
       
      </div>
    </main>
  );
}
