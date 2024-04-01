import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import NavLink from "@/components/NavLink";

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: NotFound
});

function NotFound() {
  return (
    <p>Not Found (on root route)</p>
  )
}

function Root() {
  return (
    <>
      <div className="navbar bg-neutral text-blue-200">
        <NavLink to="/">TicTacToe</NavLink>
        <NavLink to="/sudoku">Sudoku</NavLink>
      </div >

      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
