import PropTypes from 'prop-types'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const DeleteModal = ({open, setOpen}) => {
    // console.log("DeleteModal", open, setOpen);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-40 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg border-2 border-red-500 space-y-4 rounded-lg bg-white p-12">
            <DialogTitle className="font-bold text-lg text-center">Delete Account</DialogTitle>
            <Description className="text-center cursor-pointer">Are you sure you want to delete your account? This action cannot be undone.</Description>
            
            
            <div className="flex gap-4 items-center justify-center">
              <button className='md:w-[15%] bg-red-500 text-white sm:w-[25%] p-2 rounded-md cursor-pointer hover:bg-red-600 hover:font-semibold' onClick={() => setOpen(false)}>Delete</button>
              <button className='md:w-[15%] bg-gray-500 text-white sm:w-[25%] p-2 rounded-md cursor-pointer hover:bg-gray-600 hover:font-semibold' onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default DeleteModal