import { useState } from "react";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Details from "../Details";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [social, setSocial] = useState("");

    return (
        <Details title="Profile" image="/images/profile-main.png">
            <div className="space-y-6">
                <div className="">
                    <div className="mb-1 text-base-2">Avatar</div>
                    <div className="mb-3 text-body-2s text-theme-secondary">
                        Enhanced AI predictive analytics
                    </div>
                    <div className="flex items-center">
                        <div className="shrink-0 mr-5">
                            <Image
                                className="w-20 h-20 rounded-full object-cover"
                                src="/images/avatar.jpg"
                                width={80}
                                height={80}
                                alt=""
                            />
                        </div>
                        <button className="btn-gray shrink-0 mr-12">
                            Change avatar
                        </button>
                        <div className="max-w-[calc(50%-0.75rem)] ml-auto text-caption-2m text-theme-tertiary md:hidden">
                            Update your avatar by clicking the image below.
                            288x288 px size recommended in PNG or JPG format
                            only.
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 md:block md:space-x-0 md:space-y-6">
                    <Field
                        className="flex-1"
                        label="Display name"
                        placeholder="Display name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Full Name"
                        placeholder="Display name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="flex space-x-6 md:block md:space-x-0 md:space-y-6">
                    <Field
                        className="flex-1"
                        label="Email"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Location"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <Field
                    label="Bio"
                    placeholder="A brief introduction about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    textarea
                />
                <div className="flex space-x-6 md:block md:space-x-0 md:space-y-6">
                    <Field
                        className="flex-1"
                        label="Website"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required
                    />
                    <Field
                        className="flex-1"
                        label="Twitter"
                        placeholder="Twitter"
                        value={social}
                        onChange={(e) => setSocial(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button className="btn-secondary mt-6 md:w-full">Save</button>
        </Details>
    );
};

export default Profile;
