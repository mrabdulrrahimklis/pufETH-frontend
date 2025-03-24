import { Link, useLocation } from "react-router";
import { ROUTES } from "~/const/routes";
import { classNames } from "~/utils/classNames";

const navigation = [
  { name: "Home", href: ROUTES.HOME },
  { name: "Current Rate", href: ROUTES.CURRENT_RATE },
  { name: "Graph", href: ROUTES.GRAPH },
];

export const Navbar = () => {
  let params = useLocation();

  return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to={ROUTES.HOME}>
                <img src="./puffer-logo.svg" width={120} />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      "rounded-md px-3 py-2 text-sm text-black font-medium",
                      params.pathname === item.href ? "underline" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
