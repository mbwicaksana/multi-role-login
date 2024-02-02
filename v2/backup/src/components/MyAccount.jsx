import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { recentSession, reset, deleteSession } from "../features/userSlice";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const { isError, user } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    dispatch(deleteSession());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    dispatch(recentSession());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <NavLink to="/dashboard" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Windelov
                </span>
              </NavLink>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className="inline-flex items-center overflow-hidden">
                  <div
                    className="block shrink-0 cursor-pointer hover:opacity-80"
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Profile</span>
                    <img
                      alt="Man"
                      src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg ${
                    isDropdownOpen && "hidden"
                  }`}
                  role="menu"
                >
                  <div className="p-2">
                    <NavLink
                      to="/myAccount"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      My Profile
                    </NavLink>

                    <button
                      type="submit"
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      role="menuitem"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>

            {user && user.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/users"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink
                to="/products"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <div className="grid h-screen place-content-center sm:place-content-start sm:pt-8 bg-white px-4">
        <header>
          <div
            className={`mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ${
              isSidebarOpen && "sm:ml-64"
            }`}
          >
            {/* START OF MAIN CONTENT */}
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              {/* START OF LEFT GRID */}
              <div class="h-screen">
                <a
                  href="#"
                  class="block rounded-lg p-4 shadow-sm shadow-indigo-100"
                >
                  <img
                    alt="Home"
                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    class="h-56 w-full rounded-md object-cover"
                  />

                  <div class="mt-2">
                    <dl>
                      <div>
                        <dt class="sr-only">Price</dt>

                        <dd class="text-sm text-gray-500">$240,000</dd>
                      </div>

                      <div>
                        <dt class="sr-only">Address</dt>

                        <dd class="font-medium">
                          123 Wallaby Avenue, Park Road
                        </dd>
                      </div>
                    </dl>

                    <div class="mt-6 flex items-center gap-8 text-xs">
                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                          class="h-4 w-4 text-indigo-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                          />
                        </svg>

                        <div class="mt-1.5 sm:mt-0">
                          <p class="text-gray-500">Parking</p>

                          <p class="font-medium">2 spaces</p>
                        </div>
                      </div>

                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                          class="h-4 w-4 text-indigo-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>

                        <div class="mt-1.5 sm:mt-0">
                          <p class="text-gray-500">Bathroom</p>

                          <p class="font-medium">2 rooms</p>
                        </div>
                      </div>

                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                          class="h-4 w-4 text-indigo-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>

                        <div class="mt-1.5 sm:mt-0">
                          <p class="text-gray-500">Bedroom</p>

                          <p class="font-medium">4 rooms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              {/* END OF LEFT GRID */}
              {/* START OF RIGHT GRID */}
              <div class="h-screen lg:col-span-2">
                <a
                  href="#"
                  class="block rounded-lg p-4 shadow-sm shadow-indigo-100"
                >
                  <img
                    alt="Home"
                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    class="h-56 w-full rounded-md object-cover"
                  />

                  <div class="mt-2">
                    <dl>
                      <div>
                        <dt class="sr-only">Price</dt>

                        <dd class="text-sm text-gray-500">$240,000</dd>
                      </div>

                      <div>
                        <dt class="sr-only">Address</dt>

                        <dd class="font-medium">
                          123 Wallaby Avenue, Park Road
                        </dd>
                      </div>
                    </dl>

                    <div class="mt-6 flex items-center gap-8 text-xs">
                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                          class="h-4 w-4 text-indigo-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                          />
                        </svg>

                        <div class="mt-1.5 sm:mt-0">
                          <p class="text-gray-500">Parking</p>

                          <p class="font-medium">2 spaces</p>
                        </div>
                      </div>

                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                          class="h-4 w-4 text-indigo-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>

                        <div class="mt-1.5 sm:mt-0">
                          <p class="text-gray-500">Bathroom</p>

                          <p class="font-medium">2 rooms</p>
                        </div>
                      </div>

                      <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                          class="h-4 w-4 text-indigo-700"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>

                        <div class="mt-1.5 sm:mt-0">
                          <p class="text-gray-500">Bedroom</p>

                          <p class="font-medium">4 rooms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              {/* END OF RIGHT GRID */}
            </div>

            {/* END OF MAIN CONTENT */}
          </div>
        </header>
      </div>
    </>
  );
};

export default Dashboard;
