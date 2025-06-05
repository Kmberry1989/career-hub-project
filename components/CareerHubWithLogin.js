
// CareerHubWithLogin.js – Full interactive app with auth and Firestore (HTML + Tailwind version)
import { useEffect, useState } from "react";
import { Briefcase, Search, BookOpen, UserCheck, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginButton from "../components/LoginButton";
import { fetchProfile, saveProfile } from "../lib/firebase";

export default function CareerHub() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState({ name: "", goals: "" });
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    fetch("/api/mock-jobs.json")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs));
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile(user.uid).then((data) => {
        if (data) setProfile(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveProfile(user.uid, profile);
    } else {
      localStorage.setItem("careerProfile", JSON.stringify(profile));
    }
  }, [profile, user]);

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <main className="grid gap-6 p-4 md:p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold">
            Career Hub
          </motion.h1>
          <div className="flex gap-2 items-center">
            <LoginButton onUser={setUser} />
            <Button onClick={toggleDarkMode} variant="ghost">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="explore" onValueChange={(value) => setActiveTab(value)} className="w-full">
          <TabsList className="grid grid-cols-4 gap-2 text-xs md:text-base">
            <TabsTrigger value="explore"><Search className="inline mr-1 md:mr-2" />Explore</TabsTrigger>
            <TabsTrigger value="learn"><BookOpen className="inline mr-1 md:mr-2" />Learn</TabsTrigger>
            <TabsTrigger value="jobs"><Briefcase className="inline mr-1 md:mr-2" />Jobs</TabsTrigger>
            <TabsTrigger value="profile"><UserCheck className="inline mr-1 md:mr-2" />Profile</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {activeTab === "explore" && (
              <TabsContent value="explore" forceMount>
                <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <Card>
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold mb-2">Explore Career Paths</h2>
                      <Input placeholder="Search by skill, title, or industry..." className="mb-4" />
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["Design", "Technology", "Healthcare", "Marketing", "Education", "More..."].map((label) => (
                          <motion.div whileHover={{ scale: 1.05 }} key={label}>
                            <Button variant="outline" className="w-full">{label}</Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "learn" && (
              <TabsContent value="learn" forceMount>
                <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <Card>
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold mb-2">Learning Resources</h2>
                      <ul className="list-disc list-inside text-sm space-y-2">
                        <li>Free career-building workshops</li>
                        <li>Interview prep courses</li>
                        <li>Resume writing tips</li>
                        <li>Skill certification programs</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "jobs" && (
              <TabsContent value="jobs" forceMount>
                <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <Card>
                    <CardContent className="p-4">
                      <h2 className="text-xl font-semibold mb-2">Featured Jobs</h2>
                      <div className="space-y-3">
                        {jobs.length > 0 ? jobs.map((job, index) => (
                          <motion.div key={index} className="p-3 border rounded-xl" whileHover={{ scale: 1.02 }}>
                            <p className="font-semibold">{job.title}</p>
                            <p className="text-sm">at {job.company}</p>
                          </motion.div>
                        )) : <p className="text-sm">Loading jobs...</p>}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "profile" && (
              <TabsContent value="profile" forceMount>
                <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <h2 className="text-xl font-semibold">Your Career Profile</h2>
                      <Input
                        placeholder="Your Name"
                        value={profile.name}
                        onChange={(e) => updateProfile("name", e.target.value)}
                      />
                      <Input
                        placeholder="Your Goals"
                        value={profile.goals}
                        onChange={(e) => updateProfile("goals", e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        {user ? "Saved to your account." : "Saved locally in browser."}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
}
