import Layout from './components/Layout';
import Section from './components/Section';
import MathBackground from './components/MathBackground';
import ResearchSection from './components/ResearchSection';
import ProjectSection from './components/ProjectSection';
import RLPlayground from './components/RLPlayground';
import { EducationSection, ExperienceSection, HonorsSection, TeachingSection } from './components/BioSections';
import { motion } from 'framer-motion';

function App() {
  return (
    <Layout>
      <Section id="home" className="flex items-center justify-center min-h-screen relative">
        <MathBackground />
        <div className="text-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-9xl font-bold font-mono tracking-tighter mb-4">
              SARANATH P<span className="text-math-accent">.</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 font-mono"
          >

          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 flex justify-center gap-4 text-math-blue text-sm font-mono"
          >
            <span>P(Success) → 1</span>
            <span>|</span>
            <span>Linear(Time)</span>
          </motion.div>
        </div>
      </Section>

      <Section id="about" title="About Me">
        <div className="grid gap-8 text-lg text-gray-300">
          <div className="max-w-4xl mx-auto">
            <p className="leading-relaxed mb-6 text-xl text-center">
              I believe every problem is just an <span className="text-math-accent font-bold">eigenvalue</span> waiting to be found.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/5 p-6 rounded-lg border border-gray-800">
                <h3 className="text-math-secondary font-bold font-mono mb-3">Research Focus</h3>
                <p className="text-gray-400 leading-relaxed">
                  My work centers on <span className="text-gray-200">decision-making under uncertainty</span> —
                  specifically, how to <span className="text-math-accent">rank</span> items, identify winners, and make optimal choices
                  when you can only afford a limited number of comparisons. I study the spectral geometry of comparison graphs
                  and design algorithms that are both <span className="text-math-blue">sample-efficient</span> and theoretically grounded.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border border-gray-800">
                <h3 className="text-math-accent font-bold font-mono mb-3">What Drives Me</h3>
                <p className="text-gray-400 leading-relaxed">
                  I love the moment when a messy real-world problem reveals elegant mathematical structure —
                  whether that's proving a <span className="text-math-secondary">spectral gap bound</span> for ranking,
                  building <span className="text-math-blue">LLM agents</span> for synthetic data generation,
                  or designing neural architectures that respect the geometry of the data.
                </p>
              </div>
            </div>

            <p className="text-center text-gray-500 italic font-mono">
              Currently: <span className="text-gray-300">MS by Research</span> student at IIT Madras,
              exploring active learning for ranking under shoestring budgets.
            </p>
          </div>
        </div>
      </Section>

      <Section id="research" title="Research Experience">
        <ResearchSection />
      </Section>

      <Section id="experience" title="Professional Experience">
        <ExperienceSection />
        <TeachingSection />
      </Section>

      <Section id="projects" title="Selected Projects">
        <ProjectSection />
        <RLPlayground />
      </Section>

      <Section id="education" title="Education & Honors">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-gray-400 mb-8 font-mono border-b border-gray-800 pb-2">Academic Timeline</h3>
            <EducationSection />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-400 mb-8 font-mono border-b border-gray-800 pb-2">Achievements</h3>
              <HonorsSection />
            </div>
            <div className="bg-math-blue/5 p-6 rounded border border-math-blue/20">
              <h4 className="text-math-blue font-bold font-mono mb-2">My Philosophy</h4>
              <p className="text-sm text-gray-400 font-mono italic">
                "God does not play dice with the universe... but we must model it as if He does."
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

export default App;
