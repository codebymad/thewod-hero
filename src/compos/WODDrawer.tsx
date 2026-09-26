import { Drawer } from "@heroui/react";
import { CloseButton } from "@heroui/react";
import { Tabs } from "@heroui/react";

interface WODDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function WODDrawer({
  isOpen,
  onOpenChange,
}: WODDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>WOD   <CloseButton slot="close" /></Drawer.Heading>

            </Drawer.Header>

            <Drawer.Body>
              <Tabs className="w-full max-w-md">
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Options">
                    <Tabs.Tab id="pages">
                      Pages
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="profile">
                      Profile
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    {/* <Tabs.Tab id="reports">
                      Reports
                      <Tabs.Indicator />
                    </Tabs.Tab> */}
                  </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel className="pt-4" id="pages">
                  <p>View your project overview and recent activity.</p>
                </Tabs.Panel>
                <Tabs.Panel className="pt-4" id="profile">
                  <p>Track your metrics and analyze performance data.</p>
                </Tabs.Panel>
              </Tabs>
            </Drawer.Body>

            <Drawer.Footer>
              {/* <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button slot="close">
                Confirm
              </Button> */}

              <p>Hello</p>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}