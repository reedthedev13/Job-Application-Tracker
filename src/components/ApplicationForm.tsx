import { useState } from "react";
import type { Application } from "../types";
import type React from "react";

interface Props {
  onSubmit: (app: Application) => void;
  initialData?: Application;
}

const statusOptions = ["Applied", "Interviewing", "Offer", "Rejected"] as const;

const ApplicationForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Application>(
    initialData ?? {
      company: "",
      position: "",
      status: "Applied",
      dateApplied: new Date().toISOString().slice(0, 10),
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        required
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        required
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location ?? ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="ml-2 border rounded px-2 py-1"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date Applied:
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          className="ml-2 border rounded px-2 py-1"
        />
      </label>
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes ?? ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="resumeUrl"
        placeholder="Resume URL"
        value={formData.resumeUrl ?? ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Save
      </button>
    </form>
  );
};

export default ApplicationForm;
