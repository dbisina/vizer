import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { User } from "@shared/schema";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
  });

  // Get current user ID from session or localStorage
  const userId = localStorage.getItem("userId");

  // Fetch user profile
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["/api/user", userId],
    enabled: !!userId,
  });

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("PATCH", `/api/user/${userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user", userId] });
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleEdit = () => {
    if (user) {
      setFormData({
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        country: user.country || "",
        phone: user.phone || "",
      });
      setIsEditing(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>Please log in to view your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/auth")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.username;

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.profileImage || ""} alt={displayName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{displayName}</CardTitle>
                  <CardDescription>{user.username}</CardDescription>
                </div>
              </div>
              <Button
                variant={isEditing ? "ghost" : "outline"}
                onClick={() => (isEditing ? setIsEditing(false) : handleEdit())}
                data-testid="button-edit-profile"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isEditing ? (
              <>
                {/* Edit Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" data-testid="label-firstname">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      data-testid="input-firstname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" data-testid="label-lastname">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      data-testid="input-lastname"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" data-testid="label-email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    data-testid="input-email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" data-testid="label-country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                      data-testid="input-country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" data-testid="label-phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    data-testid="button-save-profile"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* View Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground text-sm">First Name</Label>
                    <p className="text-foreground font-medium mt-1" data-testid="text-firstname">
                      {user.firstName || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Last Name</Label>
                    <p className="text-foreground font-medium mt-1" data-testid="text-lastname">
                      {user.lastName || "Not set"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">Email Address</Label>
                  <p className="text-foreground font-medium mt-1" data-testid="text-email">
                    {user.email || "Not set"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground text-sm">Country</Label>
                    <p className="text-foreground font-medium mt-1" data-testid="text-country">
                      {user.country || "Not set"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-sm">Phone Number</Label>
                    <p className="text-foreground font-medium mt-1" data-testid="text-phone">
                      {user.phone || "Not set"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
