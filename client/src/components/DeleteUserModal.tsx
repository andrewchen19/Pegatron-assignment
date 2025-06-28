import DeleteButton from "./DeleteButton";

const DeleteUserModal = () => {
  return (
    <dialog data-test="delete-modal" id="my-modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg font-montserrat">Warning !</h3>
        <p className="mx-auto py-4 ">
          Deletion is not reversible, still want to proceed?
        </p>

        <div className="flex justify-end gap-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm">Close</button>
          </form>

          <DeleteButton size="btn-sm" text="delete" />
        </div>
      </div>
    </dialog>
  );
};

export default DeleteUserModal;
