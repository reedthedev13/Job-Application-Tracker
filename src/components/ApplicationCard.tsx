import React from "react";
import type { Application } from "../types";

interface Props {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

const ApplicationCard: React.FC<Props> = ({
  application,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border p-4 rounded shadow-md bg-white text-gray-900">
      <h3 className="text-xl font-semibold">
        {application.position} @ {application.company}
      </h3>
      <p>
        Status: <strong>{application.status}</strong>
      </p>
      <p>
        Date Applied: {new Date(application.dateApplied).toLocaleDateString()}
      </p>
      {application.location && <p>Location: {application.location}</p>}
      {application.notes && <p>Notes: {application.notes}</p>}
      {application.resumeUrl && (
        <p>
          <a
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            Resume
          </a>
        </p>
      )}
      <div className="mt-2 flex space-x-2">
        <button
          onClick={() => onEdit(application)}
          className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => application.id && onDelete(application.id)}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
