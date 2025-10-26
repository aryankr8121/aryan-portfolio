'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Heart,
  Send,
  MoreHorizontal,
  Globe,
  Briefcase,
  MapPin,
  Clock,
  Users,
  Star,
  Award,
  Code
} from 'lucide-react';

export default function FacebookStylePortfolio() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [aiMode, setAiMode] = useState(false);
  const router = useRouter();

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) newLiked.delete(postId);
    else newLiked.add(postId);
    setLikedPosts(newLiked);
  };

  const toggleComments = (postId: string) => {
    const newShow = new Set(showComments);
    if (newShow.has(postId)) newShow.delete(postId);
    else newShow.add(postId);
    setShowComments(newShow);
  };

  const posts = [
    {
      id: 'post1',
      type: 'intro',
      timestamp: '2h ago',
      feeling: 'excited about my journey',
      content:
        "Hey everyone! 👋 I'm Aryan Kumar, a Full-Stack Developer and AI enthusiast passionate about building innovative solutions that make a difference. I love combining creativity with technology to create amazing digital experiences!",
      likes: 245,
      comments: 18,
      shares: 12
    },
    {
      id: 'post2',
      type: 'project',
      timestamp: '1 day ago',
      content:
        "🚀 Just launched AryanGPT - my AI-powered chatbot portfolio! Built with React, Next.js, and Gemini AI to create an interactive experience. Click the top-right toggle to chat with it! ⚙️",
      tags: ['#React', '#NextJS', '#AI', '#WebDev'],
      likes: 189,
      comments: 24,
      shares: 15
    }
  ];

  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'Python & AI/ML', level: 90 },
    { name: 'Node.js & Express', level: 88 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Cloud & DevOps', level: 82 }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Facebook-style Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <h1 className="text-2xl font-bold text-blue-600">
              {aiMode ? 'AryanGPT Chat' : "Aryan's Portfolio"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (aiMode) setAiMode(false);
                else router.push('/aryangpt');
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
            >
              {aiMode ? '🔙 Back to Portfolio' : '💬 Switch to AryanGPT'}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!aiMode ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="relative px-6 pb-6">
                    <div className="absolute -top-16 left-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 border-4 border-white flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                        A
                      </div>
                    </div>
                    <div className="pt-20">
                      <h2 className="text-2xl font-bold text-slate-900">Aryan Kumar</h2>
                      <p className="text-slate-600 mb-4">Full-Stack Developer & AI Enthusiast</p>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>Full-Stack Developer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Mysuru, Karnataka, India</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <a
                            href="https://github.com/aryankr8121"
                            className="text-blue-600 hover:underline"
                          >
                            github.com/aryankr8121
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Skills Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Skills</h3>
                  <div className="space-y-4">
                    {skills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700 font-medium">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="bg-blue-500 h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Feed Section */}
              <div className="lg:col-span-8 space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                          A
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Aryan Kumar</h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:bg-slate-100 p-2 rounded-full transition">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="px-4 pb-3">
                      <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {post.content}
                      </p>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-blue-600 hover:underline cursor-pointer text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
