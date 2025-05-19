import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  User,
  Clock,
  BarChart2,
  ArrowUp,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/login");

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get("http://localhost:8000/api/user")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  const LoadingSkeleton = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-indigo-100 rounded-full mb-4"></div>
        <div className="h-4 bg-indigo-100 rounded w-32 mb-2"></div>
        <div className="h-3 bg-indigo-50 rounded w-48"></div>
      </div>
    </div>
  );

  const WelcomeCard = () => (
    <div className="bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            Welcome, {user?.name || "User"}
          </h3>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Here's what's happening with your account today.
        </p>
        <div className="mt-4 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm inline-flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>
            Last login: {user ? new Date().toLocaleDateString() : "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, icon, bgColor, textColor, increase }) => (
    <div
      className={`overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow text-white ${bgColor}`}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm font-medium ${textColor}`}>{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
        </div>
        <div className="mt-4 flex items-center">
          <ArrowUp className="w-4 h-4 text-green-300 mr-1" />
          <span className={`text-sm ${textColor}`}>{increase}</span>
        </div>
      </div>
    </div>
  );

  const MessagesCard = () => (
    <div className="md:col-span-2 bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Messages
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Message {item}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EventsCard = () => (
    <div className="bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Event {item}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Scheduled for{" "}
                  {new Date(Date.now() + item * 86400000).toLocaleDateString()}
                </p>
                <p className="text-xs text-indigo-600 font-medium mt-2">
                  View details
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-gray-500">
            Welcome back, {user?.name || "User"}!
          </p>
        </header>

        {!user ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <WelcomeCard />
            <StatCard
              title="Monthly Visitors"
              value="1,248"
              icon={<BarChart2 className="w-6 h-6" />}
              bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
              textColor="text-indigo-100"
              increase="12% increase from last month"
            />
            <StatCard
              title="Completed Tasks"
              value="36"
              icon={<CheckCircle className="w-6 h-6" />}
              bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600"
              textColor="text-emerald-100"
              increase="5% increase from last week"
            />
            <MessagesCard />
            <EventsCard />
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
