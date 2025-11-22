import LoadingState from '../LoadingState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoadingStateExample() {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Loading States</h2>
        <p className="text-muted-foreground">Interactive Unicorn Studio animations for different app states</p>
      </div>

      <Tabs defaultValue="thinking" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="thinking">AI Thinking</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="saving">Saving</TabsTrigger>
        </TabsList>
        <TabsContent value="thinking" className="mt-6">
          <LoadingState type="thinking" message="Analyzing your visa requirements..." />
        </TabsContent>
        <TabsContent value="processing" className="mt-6">
          <LoadingState type="processing" message="Auto-filling your application forms..." />
        </TabsContent>
        <TabsContent value="saving" className="mt-6">
          <LoadingState type="saving" message="Securely saving your documents..." />
        </TabsContent>
      </Tabs>
    </div>
  );
}
