import { Drawer, Separator } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { House } from '@gravity-ui/icons';
import { Calendar } from '@gravity-ui/icons';
import { Person } from '@gravity-ui/icons';

interface WODDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function WODDrawer({
  isOpen,
  onOpenChange,
}: WODDrawerProps) {

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false); // Close drawer after navigation
  };

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>

                {/* <CloseButton slot="close" /> */}

              </Drawer.Heading>

            </Drawer.Header>

            <Drawer.Body>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleNavigation("/home")}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <House className="size-5 shrink-0" />
                  <span>Home</span>
                </button>

                <Separator />
                <button
                  type="button"
                  onClick={() => handleNavigation("/wodplanner")}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Calendar className="size-5 shrink-0" />
                  <span>WOD Planner</span>
                </button>

                <Separator />
                <button
                  type="button"
                  // onClick={() => handleNavigation("/wodplanner")}
                  className="flex w-full cursor-not-allowed items-center gap-3 rounded-md p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Person className="size-5 shrink-0" />
                  <span>Profile</span>
                </button>
              </div>
            </Drawer.Body>

            <Drawer.Footer>
              {/* <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button slot="close">
                Confirm
              </Button> */}

              <p>the<b>WOD</b></p>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}