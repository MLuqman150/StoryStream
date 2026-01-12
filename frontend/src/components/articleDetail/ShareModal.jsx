import React from 'react'
import PropTypes from 'prop-types'
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ShareModal = ({isOpen, setIsOpen, blogUrl}) => {
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="rounded-lg border border-gray-200 relative z-40 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-lg text-center">Share Blog</DialogTitle>
            <Description className="text-center"><strong>BLog URL:</strong> {blogUrl}</Description>
            
            <div className="flex gap-4 items-center justify-center">
              <button className='md:w-[15%] bg-blue-700 text-white sm:w-[25%] p-2 rounded-md cursor-pointer hover:bg-blue-200 hover:text-blue-700 hover:font-semibold' onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  blogUrl: PropTypes.string.isRequired,
}

export default ShareModal