
import { Popover, Transition } from '@headlessui/react'
import {
  LinkIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center justify-between border-b-2 border-gray-100 py-6">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <a href="#">
                        <span className="sr-only">URL Shortener</span>
                        <LinkIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                </div>
                <div className="-my-2 -mr-2">
                    <a href="#">
                        <h1>URLen.one</h1>
                    </a>
                </div>
            </div>
        </div>
    </Popover>
  )
}