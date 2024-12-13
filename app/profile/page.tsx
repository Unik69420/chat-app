"use client";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useAuthStore } from "../store/useAuthStore";

interface UserProfile {
  username: string;
  email: string;
  joinedDate: string;
  avatarUrl: string | null;
}

const ProfilePage: React.FC = () => {
  
  const {authUser, updateProfile} = useAuthStore();

 

  
  return (
    <div className="h-screen pt-15 ">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="rounded-xl p-6  shadow space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-gray-500">Your profile information</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  ""
                }
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
              <Label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-600"
              >
                Change
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 cursor-pointer">
              Click "Change" to browse images
            </p>
            <Button
              className="mt-4"
              onClick={handleImageUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Avatar"}
            </Button>
          </div>

          {/* User Information Section */}
          <div className="space-y-4">
            <div>
              <Label className="block text-gray-700 font-medium">Username</Label>
              <Input value={userProfile.username} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label className="block text-gray-700 font-medium">Email</Label>
              <Input value={userProfile.email} readOnly className="bg-gray-100" />
            </div>
          </div>

          {/* Account Information */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-700">
              Account Information
            </h2>
            <p className="text-gray-500">
              Joined Date: {new Date(userProfile.joinedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
