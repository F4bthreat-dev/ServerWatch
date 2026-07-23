/*
 * ServerWatch - Dashboard de Monitoramento
 * Autor: f4bthreat-dev (Fabriccio "Threatfull")
 * Versão: 2.0.0 - Multi-Disk + Design Moderno
 */

console.log('🚀 ServerWatch v2.0 iniciado - Autor: f4bthreat-dev');

const CONFIG = {
    API_URL: '/api/metrics',
    UPDATE_INTERVAL: 2000,
    MAX_DATA_POINTS: 60
};

let charts = {};
let updateInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Página carregada, iniciando dashboard...');
    inicializarGraficos();
    atualizarDashboard();
    updateInterval = setInterval(atualizarDashboard, CONFIG.UPDATE_INTERVAL);
});

function inicializarGraficos() {
    console.log('📊 Criando gráficos...');
    
    const configs = [
        { id: 'cpuChart', label: 'CPU %', color: 'rgba(102, 126, 234, 1)', bg: 'rgba(102, 126, 234, 0.1)' },
        { id: 'memoryChart', label: 'Memória %', color: 'rgba(76, 175, 80, 1)', bg: 'rgba(76, 175, 80, 0.1)' },
        { id: 'networkChart', label: 'Rede MB/s', color: 'rgba(233, 30, 99, 1)', bg: 'rgba(233, 30, 99, 0.1)' }
    ];
    
    configs.forEach(cfg => {
        const ctx = document.getElementById(cfg.id);
        if (ctx) {
            charts[cfg.id] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: cfg.label,
                        data: [],
                        borderColor: cfg.color,
                        backgroundColor: cfg.bg,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 500 },
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                        x: { grid: { display: false }, ticks: { maxTicksLimit: 10, font: { size: 9 } } }
                    }
                }
            });
        }
    });
    
    console.log('✅ Gráficos criados!');
}

async function atualizarDashboard() {
    try {
        const resposta = await fetch(CONFIG.API_URL);
        const dados = await resposta.json();
        
        if (dados.error) {
            console.error('❌ Erro:', dados.error);
            document.getElementById('statusText').textContent = '🔴 Erro: ' + dados.error;
            return;
        }
        
        atualizarInterface(dados);
        document.getElementById('statusText').textContent = '🟢 Atualizado';
        document.getElementById('timestamp').textContent = new Date().toLocaleString();
        
    } catch (erro) {
        console.error('❌ Erro de conexão:', erro);
        document.getElementById('statusText').textContent = '🔴 Erro de conexão';
    }
}

function atualizarInterface(dados) {
    console.log('🔄 Atualizando interface...');
    
    // CPU
    if (dados.cpu) {
        const cpu = dados.cpu.avg_usage || 0;
        document.getElementById('cpuUsage').textContent = cpu.toFixed(1) + '%';
        document.getElementById('cpuCores').textContent = dados.cpu.cores + ' núcleos';
        if (dados.cpu.frequency) {
            document.getElementById('cpuFreq').textContent = (dados.cpu.frequency.current || 0).toFixed(0) + ' MHz';
        }
        atualizarBarra('cpuProgress', cpu);
        atualizarGrafico('cpuChart', cpu);
    }
    
    // Memória
    if (dados.memory) {
        const mem = dados.memory.percentage || 0;
        const usedGB = (dados.memory.used / 1024 / 1024 / 1024).toFixed(1);
        const totalGB = (dados.memory.total / 1024 / 1024 / 1024).toFixed(1);
        const availableGB = (dados.memory.available / 1024 / 1024 / 1024).toFixed(1);
        document.getElementById('memoryUsage').textContent = mem.toFixed(1) + '%';
        document.getElementById('memoryDetails').textContent = usedGB + ' GB / ' + totalGB + ' GB';
        document.getElementById('memoryAvailable').textContent = 'Disponível: ' + availableGB + ' GB';
        atualizarBarra('memoryProgress', mem);
        atualizarGrafico('memoryChart', mem);
    }
    
    // DISCO - MULTI DISK (CORRIGIDO)
    if (dados.disk) {
        console.log('💾 Processando dados do disco:', dados.disk);
        
        const diskInfo = dados.disk;
        
        // Verifica se tem a propriedade disks
        if (diskInfo.disks && diskInfo.disks.length > 0) {
            console.log('✅ Discos encontrados:', diskInfo.disks.length);
            
            // Atualiza o card principal
            const totalPercent = diskInfo.total_percent || 0;
            const totalGB = (diskInfo.total_size / 1024 / 1024 / 1024).toFixed(1);
            const usedGB = (diskInfo.total_used / 1024 / 1024 / 1024).toFixed(1);
            const freeGB = (diskInfo.total_free / 1024 / 1024 / 1024).toFixed(1);
            const count = diskInfo.count || 0;
            
            document.getElementById('diskUsage').textContent = totalPercent.toFixed(1) + '%';
            document.getElementById('diskDetails').textContent = usedGB + ' GB / ' + totalGB + ' GB';
            document.getElementById('diskFree').textContent = 'Livre: ' + freeGB + ' GB';
            document.getElementById('diskCount').textContent = count + ' discos';
            atualizarBarra('diskProgress', totalPercent);
            
            // Lista de discos
            let html = '';
            diskInfo.disks.forEach(disk => {
                const percent = disk.percent || 0;
                const totalGB_disk = (disk.total / 1024 / 1024 / 1024).toFixed(1);
                const usedGB_disk = (disk.used / 1024 / 1024 / 1024).toFixed(1);
                
                // Remove a barra do final do nome
                let deviceName = disk.device;
                if (deviceName.endsWith(':\\')) {
                    deviceName = deviceName.replace(':\\', '');
                } else if (deviceName.endsWith(':')) {
                    deviceName = deviceName.replace(':', '');
                }
                
                let statusClass = 'low';
                if (percent > 80) statusClass = 'high';
                else if (percent > 60) statusClass = 'medium';
                
                html += `
                    <div class="disk-item">
                        <span class="disk-name">💾 ${deviceName}</span>
                        <span class="disk-usage ${statusClass}">${usedGB_disk} GB / ${totalGB_disk} GB (${percent.toFixed(1)}%)</span>
                    </div>
                `;
            });
            
            document.getElementById('diskList').innerHTML = html;
            console.log('✅ Lista de discos atualizada!');
        } else {
            console.warn('⚠️ Nenhum disco encontrado na API');
            document.getElementById('diskList').innerHTML = `
                <div class="disk-item">
                    <span class="disk-name" style="color: #868e96;">Nenhum disco detectado</span>
                </div>
            `;
        }
    } else {
        console.warn('⚠️ Dados de disco não disponíveis');
    }
    
    // Rede
    if (dados.network) {
        const sentMB = (dados.network.bytes_sent / 1024 / 1024).toFixed(1);
        const recvMB = (dados.network.bytes_recv / 1024 / 1024).toFixed(1);
        const packets = (dados.network.packets_sent + dados.network.packets_recv || 0).toLocaleString();
        document.getElementById('networkSent').textContent = sentMB + ' MB';
        document.getElementById('networkRecv').textContent = recvMB + ' MB';
        document.getElementById('networkPackets').textContent = 'Pacotes: ' + packets;
        
        const totalMB = (dados.network.bytes_sent + dados.network.bytes_recv) / 1024 / 1024;
        atualizarGrafico('networkChart', totalMB);
    }
    
    // Processos
    if (dados.processes && dados.processes.length > 0) {
        let html = '';
        dados.processes.forEach((proc, i) => {
            const status = proc.status || 'unknown';
            let statusClass = 'stopped';
            if (status.toLowerCase().includes('run')) statusClass = 'running';
            else if (status.toLowerCase().includes('sleep')) statusClass = 'sleeping';
            
            html += `
                <tr>
                    <td>#${i + 1}</td>
                    <td><strong>${proc.name || 'N/A'}</strong></td>
                    <td>${(proc.cpu_percent || 0).toFixed(1)}%</td>
                    <td>${(proc.memory_percent || 0).toFixed(3)}%</td>
                    <td><span class="status-badge ${statusClass}">${status}</span></td>
                </tr>
            `;
        });
        document.getElementById('processList').innerHTML = html;
    }
    
    console.log('✅ Interface atualizada!');
}

function atualizarBarra(id, percent) {
    const barra = document.getElementById(id);
    if (barra) {
        barra.style.width = Math.min(percent, 100) + '%';
        if (percent < 50) barra.className = 'progress-bar bg-success';
        else if (percent < 80) barra.className = 'progress-bar bg-warning';
        else barra.className = 'progress-bar bg-danger';
    }
}

function atualizarGrafico(chartId, value) {
    const chart = charts[chartId];
    if (!chart) return;
    
    const hora = new Date().toLocaleTimeString();
    chart.data.labels.push(hora);
    chart.data.datasets[0].data.push(value);
    
    if (chart.data.labels.length > CONFIG.MAX_DATA_POINTS) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.update('none');
}

window.addEventListener('beforeunload', function() {
    if (updateInterval) clearInterval(updateInterval);
});

console.log('✅ Dashboard v2.0 pronto!');
console.log('💾 Suporte a múltiplos discos ativado!');