import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsSnapshot from '@/components/dashboard/StatsSnapshot';
import ActiveDesigns from '@/components/dashboard/ActiveDesigns';
import CommunityDesigns from '@/components/dashboard/CommunityDesigns';
import SuggestedPresets from '@/components/dashboard/SuggestedPresets';
import PlatformUpdates from '@/components/dashboard/PlatformUpdates';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Subtle aurora background effect */}
      <div className="fixed inset-0 aurora-bg opacity-30 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <DashboardHeader 
          userName="Jefferson"
          lastDesignName="Oversized Tee"
          lastDesignId="1"
        />

        {/* Stats Snapshot - Horizontal Layout */}
        <section className="mb-8">
          <StatsSnapshot />
        </section>

        {/* Active Designs - Full Width */}
        <section className="mb-8">
          <ActiveDesigns />
        </section>

        {/* Two Column Layout: Community Designs | Suggested + News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Community Designs (2/3 width, 4-column grid inside) */}
          <div className="lg:col-span-2">
            <CommunityDesigns />
          </div>

          {/* Right Column - Suggested + News (1/3 width) */}
          <div className="space-y-6">
            <SuggestedPresets />
            <PlatformUpdates />
          </div>
        </div>
      </div>
    </div>
  );
}
