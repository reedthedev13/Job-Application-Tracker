import { useEffect, useState } from "react";
import type { Application } from "../types";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import ApplicationCard from "./ApplicationCard";
import ApplicationForm from "./ApplicationForm";

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [showForm, setShowForm] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "applications"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const apps: Application[] = [];
      querySnapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() } as Application);
      });
      setApplications(apps);
    });

    return () => unsubscribe();
  }, [user]);

  const addApplication = async (app: Application) => {
    if (!user) return;
    await addDoc(collection(db, "applications"), { ...app, userId: user.uid });
    setShowForm(false);
  };

  const updateApplication = async (app: Application) => {
    if (!app.id) return;

    const appRef = doc(db, "applications", app.id);

    try {
      await updateDoc(appRef, {
        ...app,
      });
      setEditingApp(null);
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const deleteApplication = async (id: string) => {
    await deleteDoc(doc(db, "applications", id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Job Applications</h2>
        <button
          onClick={() => {
            setEditingApp(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add Application
        </button>
      </div>

      {(showForm || editingApp) && (
        <ApplicationForm
          onSubmit={editingApp ? updateApplication : addApplication}
          initialData={editingApp ?? undefined}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.length === 0 && <p>No applications yet.</p>}
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onEdit={(app) => {
              setEditingApp(app);
              setShowForm(true);
            }}
            onDelete={deleteApplication}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
