import React from "react";
import request from "../request";

export default function ViewProjectModal({ show, hide, refetch, project }) {
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { data: d } = await request.patch(`/projects/${project.id}/`, {
      name: data.projectName,
    });
    if (!d.success) {
      alert("Something went wrong");
      return;
    }

    hide();
    refetch();
  };
  return (
    <div>
      <dialog id="my_modal_4" className={`modal ${show ? "modal-open" : ""}`}>
        <form action="" onSubmit={submit}>
          <div className="modal-box w-sm lg:w-md max-w-5xl">
            <h3 className="font-bold text-lg">Project Details</h3>
            <div className="py-3">
              <div className="form-control w-full">
                <label className="input input-bordered w-full">
                  <span className="label-text">Project Name</span>
                  <input
                    type="text"
                    placeholder="Type here"
                    name="projectName"
                    required
                    className="w-full"
                    defaultValue={project?.name}
                  />
                </label>
              </div>
            </div>
            <div className="modal-action">
              <div className="space-x-2">
                <button className="btn btn-success btn-sm" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={hide}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}
