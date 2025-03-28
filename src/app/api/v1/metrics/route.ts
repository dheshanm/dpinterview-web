const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
};

const formatMemoryUsage = (memoryUsage: NodeJS.MemoryUsage) => {
    return {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
    };
};

const formatCpuUsage = (cpuUsage: NodeJS.CpuUsage) => {
    return {
        user: `${(cpuUsage.user / 1000).toFixed(2)} ms`,
        system: `${(cpuUsage.system / 1000).toFixed(2)} ms`,
    };
};

const formatHrtime = (hrtime: [number, number]) => {
    const seconds = hrtime[0];
    const nanoseconds = hrtime[1];
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s ${Math.floor(nanoseconds / 1e6)}ms`;
};

export async function GET(
    _: Request  // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<Response> {
    const metrics = {
        uptime: formatUptime(process.uptime()),
        memoryUsage: formatMemoryUsage(process.memoryUsage()),
        cpuUsage: formatCpuUsage(process.cpuUsage()),
        systemUptime: formatHrtime(process.hrtime()),
    };

    return new Response(
        JSON.stringify({ metrics }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}
