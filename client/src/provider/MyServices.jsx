import { GoDotFill } from "react-icons/go";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceListTable from "./ServiceListTable";

const MyServices = () => {
  return (
    <div className="px-2 sm:px-5 pb-10">
      <div className="flex items-center gap-2 text-neutral-700">
        <span className="md:text-2xl">
          <GoDotFill />
        </span>
        <p className="text-3xl md:text-4xl">My Services</p>
      </div>

      <div className="mt-5">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger className="text-md" value="active">
              Active
            </TabsTrigger>
            <TabsTrigger className="text-md" value="inactive">
              Inactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <ServiceListTable status={"active"} />
          </TabsContent>

          <TabsContent value="inactive">
            <ServiceListTable status={"inactive"} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyServices;
