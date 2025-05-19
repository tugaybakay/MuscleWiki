import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link,NavLink,useLocation } from 'react-router'

const navigation = [
  { name: 'Favorites', href: '/favorites'},
  { name: 'Search', href: '/search'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-white p-1.5 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center mx-20 sm:items-stretch sm:justify-between">
            <Link to="/">
              <div className="flex items-center space-x-1 cursor-pointer">
                <div className="flex shrink-0 items-center p-2.5 rounded-full ">
                  <img
                    alt="Muscle Wiki"
                    src="/muscle-icon.svg"
                    className="h-10 w-auto"
                  />
                </div>
                <h1 className='text-3xl font-bold max-sm:text-lg'>Muscle<span className='text-blue-600'>Wiki</span></h1>
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 h-full items-center">
                {navigation.map((item) => {
                  const isCurrent = location.pathname === item.href;

                  return (
                    <NavLink to={item.href} key={item.name}>
                      <span
                        aria-current={isCurrent ? 'page' : undefined}
                        className={classNames(
                          isCurrent ? 'bg-gray-100' : 'hover:bg-gray-100',
                          'rounded-md px-3 py-2 font-medium text-xl text-blue-600'
                        )}
                      >
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isCurrent = location.pathname === item.href;
            return (<DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                isCurrent ? 'bg-gray-100 text-blue-600' : 'text-blue-600 hover:bg-gray-100 hover:text-blue-600',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>)
            })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
