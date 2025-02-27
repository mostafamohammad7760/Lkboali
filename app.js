




let chart = null;

// Function to evaluate the status of a financial metric
function getMetricStatus(value, metricType) {
    const isProfit = value >= 1;
    const profitClass = isProfit ? 'profit' : 'loss';
    // Check the metric type for different evaluations
    switch(metricType) {
        case 'current':
            if (value >= 2) return ['Excellent', `status-good ${profitClass}`];
            if (value >= 1.5) return ['Good', `status-good ${profitClass}`];
            if (value >= 1) return ['Fair', `status-warning ${profitClass}`];
            return ['Critical', `status-critical ${profitClass}`];
        case 'quick':
            if (value >= 1) return ['Excellent', `status-good ${profitClass}`];
            if (value >= 0.7) return ['Good', `status-warning ${profitClass}`];
            return ['Critical', `status-critical ${profitClass}`];
        case 'cash':
            if (value >= 0.3) return ['Excellent', `status-good ${profitClass}`];
            if (value >= 0.2) return ['Fair', `status-warning ${profitClass}`];
            return ['Critical', `status-critical ${profitClass}`];
        default:
            return ['Undefined', ''];// Return undefined for unrecognized metric types
    }
}



// Function to assess overall financial risk status
function getOverallRiskStatus(financialRiskAnalysis) {
    if (financialRiskAnalysis.liquidityRisk.score === 'High' || 
        financialRiskAnalysis.cashFlowRisk.liquidCoverageRatio < 0.5) {
        return {
            status: 'High',
            color: '#dc3545',
            description: 'High risk level requiring immediate corrective actions'
        };
    } else if (financialRiskAnalysis.liquidityRisk.score === 'Medium' || 
               financialRiskAnalysis.cashFlowRisk.liquidCoverageRatio < 1) {
        return {
            status: 'Medium',
            color: '#ffc107',
            description: 'Medium risk level requiring monitoring and improvement'
        };
    } else {
        return {
            status: 'Low',
            color: '#28a745',
            description: 'Low risk level with good financial stability'
        };
    }
}





// Function to assess future outlook based on sensitivity
function getFutureOutlook(sensitivityMetrics) {
    if (sensitivityMetrics.sensitivityScenarios.optimistic.ratio > 2) {
        return {
            status: 'Positive',
            color: '#28a745',
            description: 'Positive outlook with potential improvement in financial indicators'
        };
    } else if (sensitivityMetrics.sensitivityScenarios.pessimistic.ratio < 1) {
        return {
            status: 'Negative',
            color: '#dc3545',
            description: 'Outlook requires caution with potential decline in financial indicators'
        };
    } else {
        return {
            status: 'Stable',
            color: '#ffc107',
            description: 'Stable outlook with ability to maintain current levels'
        };
    }
}






// Function to generate recommendations based on results and analysis
function generateRecommendations(results, sensitivityMetrics, financialRiskAnalysis) {
    let recommendations = [];
    
    // Liquidity-based recommendations
    if(results.current < 1.5) {
        recommendations.push({
            priority: 'High',
            action: 'Improve Current Ratio',
            details: 'Increase current assets or reduce current liabilities through:\n' +
                    '- Improve inventory management and turnover\n' +
                    '- Accelerate accounts receivable collection\n' +
                    '- Restructure some short-term liabilities'
        });
    }

    // Cash-based recommendations
    if(results.cash < 0.2) {
        recommendations.push({
            priority: 'Urgent',
            action: 'Enhance Cash Liquidity',
            details: 'Improve cash position through:\n' +
                    '- Implementing cash flow management\n' +
                    '- Improving accounts receivable collection\n' +
                    '- Reducing unnecessary expenses\n' +
                    '- Considering short-term investments or financing options'
        });
    }

    // Working Capital recommendations
    if((results.current - results.quick) > 0.5) {
        recommendations.push({
            priority: 'Medium',
            action: 'Optimize Working Capital',
            details: 'Improve working capital efficiency by:\n' +
                    '- Enhancing inventory management\n' +
                    '- Improving accounts payable terms\n' +
                    '- Investing in efficient cash flow systems'
        });
    }

    // Risk-based recommendations
    if(financialRiskAnalysis.liquidityRisk.score === 'High') {
        recommendations.push({
            priority: 'Urgent',
            action: 'Manage Liquidity Risk',
            details: 'Develop a comprehensive risk management plan including:\n' +
                    '- Establishing a cash reserve\n' +
                    '- Diversifying funding sources\n' +
                    '- Improving working capital management\n' +
                    '- Reviewing and updating credit policies'
        });
    }

    // Sensitivity-based recommendations
    if(sensitivityMetrics.sensitivityScenarios.pessimistic.ratio < 1) {
        recommendations.push({
            priority: 'High',
            action: 'Enhance Financial Resilience',
            details: 'Develop strategies to mitigate potential downturns by:\n' +
                    '- Building cash reserves\n' +
                    '- Diversifying revenue streams\n' +
                    '- Improving operational efficiency\n' +
                    '- Reducing non-essential expenses'
        });
    }

    return recommendations;
}



// Function to generate a final report including various analyses
function generateFinalReport(results, sensitivityMetrics, financialRiskAnalysis) {
    const healthScore = calculateHealthScore(results);
    const liquidityStatus = getOverallLiquidityStatus(results);
    const riskStatus = getOverallRiskStatus(financialRiskAnalysis);
    const futureOutlook = getFutureOutlook(sensitivityMetrics);
    const recommendations = generateRecommendations(results, sensitivityMetrics, financialRiskAnalysis);
    return {
        healthScore,
        liquidityStatus,
        riskStatus,
        futureOutlook,
        recommendations
    };
}


// Function to calculate a health score based on financial results
function calculateHealthScore(results) {
    let score = 0;
    if(results.current >= 2) score += 30;
    else if(results.current >= 1.5) score += 20;
    else if(results.current >= 1) score += 10;
    if(results.quick >= 1) score += 25;
    else if(results.quick >= 0.7) score += 15;
    if(results.cash >= 0.3) score += 25;
    else if(results.cash >= 0.2) score += 15;
    if(results.current > results.quick) score += 10;
    if(results.quick > results.cash) score += 10;
    return Math.min(score, 100);
}

// Function to determine overall liquidity status based on results
function getOverallLiquidityStatus(results) {
    if(results.current >= 2 && results.quick >= 1 && results.cash >= 0.3) {
        return {
            status: 'Excellent',
            color: '#28a745',
            description: 'Strong financial position with excellent liquidity'
        };
    } else if(results.current >= 1.5 && results.quick >= 0.7 && results.cash >= 0.2) {
        return {
            status: 'Good',
            color: '#17a2b8',
            description: 'Stable financial position with good liquidity'
        };
    } else if(results.current >= 1) {
        return {
            status: 'Fair',
            color: '#ffc107',
            description: 'Acceptable financial position needing improvement'
        };
    } else {
        return {
            status: 'Poor',
            color: '#dc3545',
            description: 'Financial position requires urgent attention'
        };
    }
}



// Function to analyze liquidity based on user input
function analyzeLiquidity() {
    const currentAssets = parseFloat(document.getElementById('currentAssets').value);
    const currentLiabilities = parseFloat(document.getElementById('currentLiabilities').value);
    const cashBalance = parseFloat(document.getElementById('cashBalance').value);
    const inventory = parseFloat(document.getElementById('inventory').value) || 0;
    const receivables = parseFloat(document.getElementById('receivables').value) || 0;
    const shortTermInvestments = parseFloat(document.getElementById('shortTermInvestments').value) || 0;
    const prepaidExpenses = parseFloat(document.getElementById('prepaidExpenses').value) || 0;
    
    const analysisType = document.getElementById('analysisType').value;// Get the selected analysis type from the dropdown menu
    const resultsContainer = document.getElementById('resultsContainer');// Container for displaying results
    
    
    if (isNaN(currentAssets) || isNaN(currentLiabilities)) {
        resultsContainer.innerHTML = '<p style="color:red;">Please enter the basic values at least</p>';
        return;
    }
    // Calculate liquidity ratios
    let results = {
        current: currentAssets / currentLiabilities,
        quick: (currentAssets - inventory) / currentLiabilities,
        cash: (cashBalance + shortTermInvestments) / currentLiabilities
    };
    // Display results based on the type of analysis selected by the user
    if (analysisType === 'current') {
        displayCurrentRatioAnalysis(results.current, currentAssets, currentLiabilities);
        return;
    } else if (analysisType === 'quick') {
        displayQuickRatioAnalysis(results.quick, currentAssets, inventory, currentLiabilities);
        return;
    } else if (analysisType === 'cash') {
        displayCashRatioAnalysis(results.cash, cashBalance, shortTermInvestments, currentLiabilities);
        return;
    }
    
    
    // Calculate additional metrics for detailed analysis
    const workingCapital = currentAssets - currentLiabilities;
    const inventoryToWorkingCapital = (workingCapital !== 0) ? (inventory / workingCapital) * 100 : 0;
    const cashToCurrentAssets = (cashBalance / currentAssets) * 100;
    
    // Calculate sensitivity metrics
    const sensitivityMetrics = calculateSensitivityMetrics(currentAssets, currentLiabilities, cashBalance);
    
    // Calculate advanced liquidity ratios
    const advancedRatios = calculateAdvancedRatios(
        currentAssets, 
        currentLiabilities, 
        cashBalance, 
        inventory, 
        receivables
    );

    // New forecasting for future analysis
    const fiveYearForecasts = calculateFiveYearForecast(currentAssets, currentLiabilities, cashBalance);

    let detailedAnalysis = [
        {
            title: 'Liquidity Depth Analysis',
            subMetrics: [
                {
                    name: 'Cash Conversion Cycle',
                    value: (cashBalance / currentLiabilities) * 100,
                    description: 'Ability to convert assets into cash to cover liabilities'
                },
                {
                    name: 'Inventory Turnover',
                    value: currentAssets ? (inventory / currentAssets) * 100 : 0,
                    description: 'Efficiency in managing inventory'
                },
                {
                    name: 'Current Liability Ratio',
                    value: (currentLiabilities / currentAssets) * 100,
                    description: 'Proportion of current liabilities to current assets'
                }
            ]
        }
    ];
    
    // Conduct financial risk analysis based on liquidity ratios
    let financialRiskAnalysis = {
        liquidityRisk: {
            score: results.current < 1 ? 'High' : 
                   results.current < 1.5 ? 'Medium' : 'Low',
            implications: results.current < 1 ? 
                'Risk of inability to cover short-term liabilities' : 
                'Liquidity position is relatively stable'
        },
        
        
        cashFlowRisk: {
            liquidCoverageRatio: (cashBalance / (currentLiabilities / 12)),// Calculate liquid coverage ratio
            assessment: (cashBalance / (currentLiabilities / 12)) < 3 ? 
                'Cash flow is weak and requires improvement' : 
                'Cash flow is adequate with a suitable safety margin',
            impactLevel: (cashBalance / (currentLiabilities / 12)) < 3 ? 'High' :
                        (cashBalance / (currentLiabilities / 12)) < 6 ? 'Medium' : 'Low',
            defensiveInterval: (cashBalance / (currentLiabilities / 365)).toFixed(2),
            recommendations: (cashBalance / (currentLiabilities / 12)) < 3 ? [
                'Improve cash flow management',
                'Develop a plan to enhance cash liquidity',
                'Review and adjust expense policies'
            ] : []
        }
    };
    
    
    // Define financial health indicators for analysis
    let financialHealthIndicators = {
        operatingCashFlow: {
            value: (cashBalance / currentLiabilities) * 100,
            interpretation: 'Ability of operating cash flow to cover liabilities',
            status: (cashBalance / currentLiabilities) > 1 ? 'Healthy' : 'Limited'
        },
        debtServiceCoverage: {
            value: (currentAssets / currentLiabilities),
            interpretation: 'Ability to service short-term debts',
            status: (currentAssets / currentLiabilities) > 1.5 ? 'Excellent' : 'Needs monitoring'
        },
        assetUtilizationEfficiency: {
            value: (currentLiabilities / currentAssets) * 100,
            interpretation: 'Efficiency in using assets to generate liquidity',
            status: (currentLiabilities / currentAssets) < 50 ? 'High' : 'Medium'
        }
    };
     
     
    // Analyze best-case and worst-case scenarios for liquidity
    let scenarioAnalysis = {
        bestCase: {
            liquidityBuffer: (currentAssets * 1.2 / currentLiabilities).toFixed(2),
            cashReserve: (cashBalance * 1.5).toFixed(2),
            interpretation: 'Scenario of growth and strong liquidity'
        },
        worstCase: {
            liquidityBuffer: (currentAssets * 0.8 / currentLiabilities).toFixed(2),
            cashReserve: (cashBalance * 0.5).toFixed(2),
            interpretation: 'Scenario requiring liquidity enhancement'
        }
    };
     
    // Conduct trend and comparative analysis
    let trendAnalysis = {
        workingCapitalTrend: workingCapital > 0 ? 'Positive' : 'Negative',
        liquidityBufferDays: (currentAssets / (currentLiabilities / 365)).toFixed(2),
        comparativeBenchmarks: {
            currentRatioIndustryAvg: 1.5,
            quickRatioIndustryAvg: 1.0,
            currentRatioComparison: results.current > 1.5 ? 'Better than average' : 'Below average'
        }
    };
     
    // Generate the final report based on the analysis results
    const finalReport = generateFinalReport(results, sensitivityMetrics, financialRiskAnalysis);

    let html = `
        <div class="comprehensive-analysis">
            <h3>In-Depth Financial Analysis</h3>
            
            <div class="analysis-group theme-1">
              <h4 class="group-title"><i class="fas fa-tachometer-alt"></i> Liquidity Depth Indicators</h4>
              <div class="deep-liquidity-metrics">
                ${detailedAnalysis[0].subMetrics.map(metric => `
                  <div class="analysis-card">
                    <h5>${metric.name}</h5>
                    <div class="metric-value ${metric.value > 20 ? 'profit' : 'loss'}">${metric.value.toFixed(2)}%</div>
                    <p>${metric.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="analysis-group theme-2">
              <h4 class="group-title"><i class="fas fa-exclamation-triangle"></i> Financial Risk Assessment</h4>
              <div class="financial-risk-assessment">
                ${Object.entries(financialRiskAnalysis).map(([key, risk]) => `
                  <div class="analysis-card">
                    <div class="risk-card">
                      <h5>${key === 'liquidityRisk' ? 'Liquidity Risk' : 'Cash Flow Risk'}</h5>
                      <div class="risk-level ${risk.score === 'High' ? 'high-risk' : 'low-risk'}">
                        ${risk.score}
                      </div>
                      <p>${risk.implications || risk.assessment}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div class="analysis-group theme-3">
              <h4 class="group-title"><i class="fas fa-heartbeat"></i> Financial Health Indicators</h4>
              <div class="financial-health-indicators">
                ${Object.entries(financialHealthIndicators).map(([key, metric]) => `
                  <div class="analysis-card">
                    <div class="health-card">
                      <h5>${metric.interpretation}</h5>
                      <div class="metric-value ${metric.status === 'Excellent' ? 'profit' : 'loss'}">${metric.value.toFixed(2)}%</div>
                      <div class="metric-status ${metric.status === 'Excellent' ? 'status-good' : 'status-warning'}">
                        ${metric.status}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="analysis-group theme-4">
              <h4 class="group-title"><i class="fas fa-project-diagram"></i> Scenario Analysis</h4>
              <div class="scenario-analysis">
                <div class="scenario-grid">
                  <div class="scenario-card best-case">
                    <h5>Best-Case Scenario</h5>
                    <p>Liquidity Buffer: ${scenarioAnalysis.bestCase.liquidityBuffer}</p>
                    <p>Cash Reserve: ${scenarioAnalysis.bestCase.cashReserve}</p>
                    <p>${scenarioAnalysis.bestCase.interpretation}</p>
                  </div>
                  <div class="scenario-card worst-case">
                    <h5>Worst-Case Scenario</h5>
                    <p>Liquidity Buffer: ${scenarioAnalysis.worstCase.liquidityBuffer}</p>
                    <p>Cash Reserve: ${scenarioAnalysis.worstCase.cashReserve}</p>
                    <p>${scenarioAnalysis.worstCase.interpretation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="analysis-group theme-5">
              <h4 class="group-title"><i class="fas fa-chart-bar"></i> Trend and Comparative Analysis</h4>
              <div class="trend-comparative-analysis">
                <div class="trend-metrics">
                  <div class="trend-card">
                    <h5>Working Capital Trend</h5>
                    <div class="trend-value ${trendAnalysis.workingCapitalTrend === 'Positive' ? 'profit' : 'loss'}">${trendAnalysis.workingCapitalTrend}</div>
                  </div>
                  <div class="trend-card">
                    <h5>Liquidity Buffer Days</h5>
                    <div class="trend-value ${trendAnalysis.liquidityBufferDays > 60 ? 'profit' : 'loss'}">${trendAnalysis.liquidityBufferDays} days</div>
                  </div>
                  <div class="trend-card">
                    <h5>Current Ratio Comparison</h5>
                    <div class="trend-value ${trendAnalysis.comparativeBenchmarks.currentRatioComparison === 'Better than average' ? 'profit' : 'loss'}">${trendAnalysis.comparativeBenchmarks.currentRatioComparison}</div>
                    <small>Industry Average: ${trendAnalysis.comparativeBenchmarks.currentRatioIndustryAvg}</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="charts-dashboard">
                <h3>Charts and Visualizations</h3>
                
                <div class="chart-grid">
                    <div class="chart-card">
                        <h4>Main Liquidity Ratios</h4>
                        <canvas id="mainRatiosChart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h4>Current Assets Distribution</h4>
                        <canvas id="currentAssetsDistributionChart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h4>Trend and Sensitivity Analysis</h4>
                        <canvas id="trendsChart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h4>Risk Analysis</h4>
                        <canvas id="riskAnalysisChart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h4>Liquidity Depth Analysis</h4>
                        <canvas id="liquidityDepthChart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h4>Financial Health Indicators</h4>
                        <canvas id="financialHealthChart"></canvas>
                    </div>

                    <div class="chart-card">
                        <h4>Scenario Analysis</h4>
                        <canvas id="scenarioAnalysisChart"></canvas>
                    </div>

                    <div class="chart-card">
                        <h4>Comparative Trend Analysis</h4>
                        <canvas id="comparativeTrendChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="advanced-ratios-analysis">
                <h3>Advanced Financial Ratios Analysis</h3>
                
                <div class="ratios-grid">
                    <div class="ratio-category">
                        <h4>Activity Ratios</h4>
                        <div class="ratios-grid">
                            <div class="ratio-card">
                                <h5>Receivables Turnover</h5>
                                <div class="ratio-value ${advancedRatios.receivablesTurnover > 4 ? 'profit' : 'loss'}">${advancedRatios.receivablesTurnover.toFixed(2)} times</div>
                                <p>Efficiency in collecting receivables</p>
                            </div>
                            
                            <div class="ratio-card">
                                <h5>Inventory Turnover</h5>
                                <div class="ratio-value ${advancedRatios.inventoryTurnover > 6 ? 'profit' : 'loss'}">${advancedRatios.inventoryTurnover.toFixed(2)} times</div>
                                <p>Efficiency in managing inventory</p>
                            </div>
                            
                            <div class="ratio-card">
                                <h5>Asset Turnover</h5>
                                <div class="ratio-value ${advancedRatios.assetTurnover > 2 ? 'profit' : 'loss'}">${advancedRatios.assetTurnover.toFixed(2)} times</div>
                                <p>Efficiency in using assets</p>
                            </div>
                        </div>
                    </div>

                    <div class="ratio-category">
                        <h4>Efficiency Ratios</h4>
                        <div class="ratios-grid">
                            <div class="ratio-card">
                                <h5>Cash Conversion Cycle</h5>
                                <div class="metrics-group">
                                    <div class="metric">
                                        <span>Average Days Inventory:</span>
                                        <span class="value ${advancedRatios.cashConversionCycle.daysInventory < 60 ? 'profit' : 'loss'}">${advancedRatios.cashConversionCycle.daysInventory.toFixed(0)} days</span>
                                    </div>
                                    <div class="metric">
                                        <span>Average Days Receivables:</span>
                                        <span class="value ${advancedRatios.cashConversionCycle.daysReceivables < 60 ? 'profit' : 'loss'}">${advancedRatios.cashConversionCycle.daysReceivables.toFixed(0)} days</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="ratio-card">
                                <h5>Working Capital Turnover</h5>
                                <div class="ratio-value ${advancedRatios.workingCapitalTurnover > 4 ? 'profit' : 'loss'}">${advancedRatios.workingCapitalTurnover.toFixed(2)} times</div>
                                <p>Efficiency in using working capital</p>
                            </div>
                        </div>
                    </div>

                    <div class="ratio-category">
                        <h4>Quality Metrics</h4>
                        <div class="ratios-grid">
                            <div class="ratio-card">
                                <h5>Quality of Liquidity</h5>
                                <div class="ratio-value ${advancedRatios.qualityOfLiquidity > 0.3 ? 'profit' : 'loss'}">${(advancedRatios.qualityOfLiquidity * 100).toFixed(2)}%</div>
                                <p>Proportion of cash in current assets</p>
                            </div>
                            
                            <div class="ratio-card">
                                <h5>Working Capital Quality</h5>
                                <div class="ratio-value ${advancedRatios.workingCapitalQuality > 0.7 ? 'profit' : 'loss'}">${(advancedRatios.workingCapitalQuality * 100).toFixed(2)}%</div>
                                <p>Proportion of liquid assets in working capital</p>
                            </div>
                        </div>
                    </div>

                    <div class="ratio-category">
                        <h4>Coverage Ratios</h4>
                        <div class="ratios-grid">
                            <div class="ratio-card">
                                <h5>Operating Cash Flow Ratio</h5>
                                <div class="ratio-value ${advancedRatios.operatingCashFlowRatio > 1 ? 'profit' : 'loss'}">${advancedRatios.operatingCashFlowRatio.toFixed(2)}</div>
                                <p>Ability to cover liabilities with operating cash flow</p>
                            </div>
                            
                            <div class="ratio-card">
                                <h5>Cash Coverage Ratio</h5>
                                <div class="ratio-value ${advancedRatios.cashCoverageRatio > 3 ? 'profit' : 'loss'}">${advancedRatios.cashCoverageRatio.toFixed(2)} months</div>
                                <p>Ability to cover monthly liabilities with cash</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="five-year-forecast">
                <h3>5-Year Financial Forecast</h3>
                
                <div class="chart-card">
                    <h4>Projected Liquidity Ratios</h4>
                    <canvas id="fiveYearForecastChart"></canvas>
                </div>
                
                <div class="forecast-details">
                    <div class="forecast-scenario">
                        <h4>Optimistic Scenario</h4>
                        ${fiveYearForecasts.optimistic.map((year, index) => `
                            <div class="forecast-card">
                                <h5>Year ${index + 1}</h5>
                                <p>Current Ratio: ${year.currentRatio.toFixed(2)}</p>
                                <p>Cash Ratio: ${year.cashRatio.toFixed(2)}</p>
                                <p>Working Capital: ${year.workingCapital.toFixed(0)}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="forecast-scenario">
                        <h4>Moderate Scenario</h4>
                        ${fiveYearForecasts.moderate.map((year, index) => `
                            <div class="forecast-card">
                                <h5>Year ${index + 1}</h5>
                                <p>Current Ratio: ${year.currentRatio.toFixed(2)}</p>
                                <p>Cash Ratio: ${year.cashRatio.toFixed(2)}</p>
                                <p>Working Capital: ${year.workingCapital.toFixed(0)}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="forecast-scenario">
                        <h4>Conservative Scenario</h4>
                        ${fiveYearForecasts.conservative.map((year, index) => `
                            <div class="forecast-card">
                                <h5>Year ${index + 1}</h5>
                                <p>Current Ratio: ${year.currentRatio.toFixed(2)}</p>
                                <p>Cash Ratio: ${year.cashRatio.toFixed(2)}</p>
                                <p>Working Capital: ${year.workingCapital.toFixed(0)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const detailedRiskAssessment = calculateDetailedRiskAssessment(results, sensitivityMetrics, advancedRatios);
    let riskAssessmentHTML = `
      <div class="analysis-group theme-5">
        <h4 class="group-title"><i class="fas fa-exclamation-triangle"></i> Detailed Financial Risk Assessment</h4>
        
        <div class="risk-assessment-grid">
          ${Object.entries(detailedRiskAssessment).map(([riskType, risk]) => `
            <div class="risk-category-card ${risk.level === 'High' ? 'high-risk' : 'low-risk'}">
              <div class="risk-header">
                <h5>${getRiskTypeTitle(riskType)}</h5>
                <div class="risk-level ${risk.level === 'High' ? 'status-critical' : 'status-good'}">
                  ${risk.level}
                </div>
              </div>
              
              <div class="risk-score">
                <div class="score-bar">
                  <div class="score-fill" style="width: ${risk.score}%; background: ${getRiskColor(risk.level)}"></div>
                </div>
                <span class="score-value">${risk.score}%</span>
              </div>
              
              <div class="risk-factors">
                ${risk.factors.map(factor => `
                  <div class="factor-item">
                    <span class="factor-name">${factor.name}</span>
                    <span class="factor-value ${typeof factor.value === 'number' ? (factor.value > 0.5 ? 'profit' : 'loss') : ''}">${typeof factor.value === 'number' ? factor.value.toFixed(2) : factor.value}</span>
                    <span class="factor-status ${getStatusClass(factor.status)}">${factor.status}</span>
                  </div>
                `).join('')}
              </div>
              
              ${risk.recommendations.length > 0 ? `
                <div class="risk-recommendations">
                  <h6>Recommendations:</h6>
                  <ul>
                    ${risk.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    
    // Append the risk assessment HTML to the results container
    html += riskAssessmentHTML;
    
    // Display the assembled HTML content in the results container
    resultsContainer.innerHTML = html;
    
    
    // Create various financial charts based on the calculated results
    createMainRatiosChart(results);
    createCurrentAssetsDistributionChart();
    createTrendsChart(results);
    createRiskAnalysisChart(results);
    createLiquidityDepthChart(currentAssets, currentLiabilities, cashBalance, inventory);
    createFinancialHealthChart(financialHealthIndicators);
    createScenarioAnalysisChart(currentAssets, currentLiabilities, cashBalance);
    createComparativeTrendChart(results);

    // Add the forecast chart creation for a five-year projection analysis
    createFiveYearForecastChart(fiveYearForecasts);
    addExportButtons(resultsContainer);
}


// Function to calculate sensitivity metrics for liquidity analysis
function calculateSensitivityMetrics(currentAssets, currentLiabilities, cashBalance) {
    return {
        sensitivityScenarios: {
            optimistic: {
                assetsIncrease: currentAssets * 1.15,
                liabilitiesDecrease: currentLiabilities * 0.90,
                ratio: (currentAssets * 1.15) / (currentLiabilities * 0.90)
            },
            pessimistic: {
                assetsDecrease: currentAssets * 0.85,
                liabilitiesIncrease: currentLiabilities * 1.10,
                ratio: (currentAssets * 0.85) / (currentLiabilities * 1.10)
            }
        },
        forecasting: {
            threeMonths: {
                projectedRatio: (currentAssets * 1.05) / (currentLiabilities * 1.02),
                cashProjection: cashBalance * 1.08
            },
            sixMonths: {
                projectedRatio: (currentAssets * 1.10) / (currentLiabilities * 1.05),
                cashProjection: cashBalance * 1.15
            }
        },
        performanceIndicators: {
            cashBurnRate: cashBalance / (currentLiabilities / 12),
            defensiveInterval: (cashBalance / (currentLiabilities / 365)).toFixed(2),
            workingCapitalEfficiency: ((currentAssets - currentLiabilities) / currentAssets * 100).toFixed(2)
        }
    };
}




// Function to calculate advanced liquidity ratios
function calculateAdvancedRatios(currentAssets, currentLiabilities, cashBalance, inventory, receivables) {
    return {
        // Activity Ratios
        receivablesTurnover: receivables > 0 ? (currentAssets / receivables) : 0,
        inventoryTurnover: inventory > 0 ? (currentAssets / inventory) : 0,
        assetTurnover: currentAssets > 0 ? (currentLiabilities / currentAssets) : 0,
        
        // Efficiency Ratios
        workingCapitalTurnover: (currentAssets - currentLiabilities) !== 0 ? 
            (currentAssets / (currentAssets - currentLiabilities)) : 0,
        cashConversionCycle: {
            daysInventory: inventory > 0 ? (inventory / (currentAssets / 365)) : 0,
            daysReceivables: receivables > 0 ? (receivables / (currentAssets / 365)) : 0
        },
        
        // Quality Metrics
        qualityOfLiquidity: cashBalance / currentAssets,
        workingCapitalQuality: (currentAssets - inventory) / currentAssets,
        
        // Coverage Ratios
        operatingCashFlowRatio: cashBalance / currentLiabilities,
        cashCoverageRatio: cashBalance / (currentLiabilities / 12)
    };
}


// New function for five-year forecasting of financial metrics
function calculateFiveYearForecast(currentAssets, currentLiabilities, cashBalance) {
    const growthScenarios = {
        optimistic: {
            assetsGrowth: 0.15, // 15% annual growth
            liabilitiesGrowth: 0.10,
            cashGrowth: 0.20
        },
        moderate: {
            assetsGrowth: 0.10, // 10% annual growth
            liabilitiesGrowth: 0.08,
            cashGrowth: 0.12
        },
        conservative: {
            assetsGrowth: 0.05, // 5% annual growth
            liabilitiesGrowth: 0.06,
            cashGrowth: 0.07
        }
    };

    const fiveYearProjections = {
        optimistic: [],
        moderate: [],
        conservative: []
    };

    
    // Calculate five-year projections for each scenario
    Object.keys(growthScenarios).forEach(scenario => {
        let projectedAssets = currentAssets;
        let projectedLiabilities = currentLiabilities;
        let projectedCash = cashBalance;

        for (let year = 1; year <= 5; year++) {
            projectedAssets *= (1 + growthScenarios[scenario].assetsGrowth);
            projectedLiabilities *= (1 + growthScenarios[scenario].liabilitiesGrowth);
            projectedCash *= (1 + growthScenarios[scenario].cashGrowth);

            fiveYearProjections[scenario].push({
                year,
                currentRatio: projectedAssets / projectedLiabilities,
                cashRatio: projectedCash / projectedLiabilities,
                workingCapital: projectedAssets - projectedLiabilities,
                totalAssets: projectedAssets,
                totalLiabilities: projectedLiabilities,
                cashBalance: projectedCash
            });
        }
    });

    return fiveYearProjections;
}



// Function to create a five-year forecast chart with improved visualization
function createFiveYearForecastChart(forecasts) {
    const ctx = document.getElementById('fiveYearForecastChart').getContext('2d');
    
    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Optimistic - Current Ratio',
                    data: forecasts.optimistic.map(year => year.currentRatio),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Moderate - Current Ratio',
                    data: forecasts.moderate.map(year => year.currentRatio),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Conservative - Current Ratio',
                    data: forecasts.conservative.map(year => year.currentRatio),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '5-Year Financial Ratio Forecasts',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Current Ratio'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}







// Function to calculate detailed risk assessments based on cash flow and liquidity metrics
function calculateDetailedRiskAssessment(results, sensitivityMetrics, advancedRatios) {
  const cashFlowMetrics = {
    operatingCashFlow: advancedRatios.operatingCashFlowRatio,
    cashCoverageRatio: advancedRatios.cashCoverageRatio,
    cashToCurrentAssets: results.cash / results.current,
    defensiveInterval: sensitivityMetrics.performanceIndicators.defensiveInterval
  };
  
  // Assess cash flow risk levels based on calculated metrics
  const getCashFlowRiskLevel = (metrics) => {
    if (metrics.operatingCashFlow < 0.5 || metrics.cashCoverageRatio < 2) {
      return 'High';
    } else if (metrics.operatingCashFlow < 0.8 || metrics.cashCoverageRatio < 3) {
      return 'Medium';
    }
    return 'Low';
  };

  return {
    liquidityRisk: {
      level: results.current < 1 ? 'High' : results.current < 1.5 ? 'Medium' : 'Low',
      score: results.current < 1 ? 85 : results.current < 1.5 ? 60 : 30,
      factors: [
        {
          name: 'Current Ratio',
          value: results.current,
          status: results.current < 1 ? 'Critical' : results.current < 1.5 ? 'Medium' : 'Good'
        },
        {
          name: 'Cash Ratio',
          value: results.cash,
          status: results.cash < 0.2 ? 'Critical' : results.cash < 0.3 ? 'Medium' : 'Good'
        }
      ],
      recommendations: results.current < 1.5 ? [
        'Improve working capital management',
        'Increase cash liquidity',
        'Enhance inventory management efficiency',
        'Consider opportunities for capital increase or additional financing'
      ] : []
    },
    cashFlowRisk: {
      level: getCashFlowRiskLevel(cashFlowMetrics),
      score: cashFlowMetrics.operatingCashFlow < 0.5 ? 85 : 
             cashFlowMetrics.operatingCashFlow < 0.8 ? 60 : 35,
      factors: [
        {
          name: 'Operating Cash Flow Ratio',
          value: cashFlowMetrics.operatingCashFlow,
          status: cashFlowMetrics.operatingCashFlow < 0.5 ? 'Critical' : 
                 cashFlowMetrics.operatingCashFlow < 0.8 ? 'Medium' : 'Good'
        },
        {
          name: 'Cash Coverage Ratio',
          value: cashFlowMetrics.cashCoverageRatio,
          status: cashFlowMetrics.cashCoverageRatio < 2 ? 'Critical' :
                 cashFlowMetrics.cashCoverageRatio < 3 ? 'Medium' : 'Good'
        },
        {
          name: 'Defensive Interval (Days)',
          value: cashFlowMetrics.defensiveInterval,
          status: cashFlowMetrics.defensiveInterval < 60 ? 'Critical' :
                 cashFlowMetrics.defensiveInterval < 90 ? 'Medium' : 'Good'
        }
      ],
      recommendations: cashFlowMetrics.operatingCashFlow < 0.8 ? [
        'Improve cash flow collection efficiency',
        'Review spending policies and rationalize expenses',
        'Develop cash liquidity management strategy',
        'Build emergency cash reserves'
      ] : []
    },
    operationalRisk: {
      level: advancedRatios.workingCapitalTurnover < 4 ? 'High' : 'Low',
      score: advancedRatios.workingCapitalTurnover < 4 ? 75 : 40,
      factors: [
        {
          name: 'Working Capital Turnover',
          value: advancedRatios.workingCapitalTurnover,
          status: advancedRatios.workingCapitalTurnover < 4 ? 'Critical' : 'Good'
        },
        {
          name: 'Operational Efficiency',
          value: advancedRatios.assetTurnover,
          status: advancedRatios.assetTurnover < 2 ? 'Medium' : 'Good'
        }
      ],
      recommendations: advancedRatios.workingCapitalTurnover < 4 ? [
        'Improve operational efficiency',
        'Review operating cycle',
        'Reduce inventory conversion period'
      ] : []
    },
    marketRisk: {
      level: sensitivityMetrics.sensitivityScenarios.pessimistic.ratio < 1 ? 'High' : 'Low',
      score: sensitivityMetrics.sensitivityScenarios.pessimistic.ratio < 1 ? 80 : 35,
      factors: [
        {
          name: 'Market Sensitivity',
          value: sensitivityMetrics.sensitivityScenarios.pessimistic.ratio,
          status: sensitivityMetrics.sensitivityScenarios.pessimistic.ratio < 1 ? 'Critical' : 'Good'
        }
      ],
      recommendations: sensitivityMetrics.sensitivityScenarios.pessimistic.ratio < 1 ? [
        'Diversify funding sources',
        'Build additional reserves',
        'Develop contingency plans'
      ] : []
    }
  };
}





// Function to get the title of the risk type based on input
function getRiskTypeTitle(riskType) {
    const titles = {
        liquidityRisk: 'Liquidity Risk',         // Title for liquidity risk
        operationalRisk: 'Operational Risk',     // Title for operational risk
        marketRisk: 'Market Risk',               // Title for market risk
        structuralRisk: 'Structural Risk'         // Title for structural risk
    };
    // Return the corresponding title or the risk type itself if not found
    return titles[riskType] || riskType;
}

// Function to get the color representation for risk levels
function getRiskColor(level) {
    switch(level) {
        case 'High': return '#dc3545';          // Color for high risk
        case 'Medium': return '#ffc107';        // Color for medium risk
        default: return '#28a745';              // Color for low risk
    }
}




// Function to get CSS class based on status
function getStatusClass(status) {
    switch(status) {
        case 'Critical': return 'status-critical'; // Class for critical status
        case 'Medium': return 'status-warning';    // Class for medium status
        default: return 'status-good';             // Class for good status
    }
}






// Function to create a bar chart for main liquidity ratios
function createMainRatiosChart(results) {
    const ctx = document.getElementById('mainRatiosChart').getContext('2d');
    
    // Function to determine bar color based on value and threshold
    const getBarColor = (value, threshold = 1) => 
        value >= threshold ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)';
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Current Ratio', 'Quick Ratio', 'Cash Ratio'], // Chart labels
            datasets: [{
                label: 'Liquidity Ratios',
                data: [results.current, results.quick, results.cash], // Data points for ratios
                backgroundColor: [
                    getBarColor(results.current), 
                    getBarColor(results.quick), 
                    getBarColor(results.cash)
                ],
                borderColor: [
                    getBarColor(results.current).replace('0.7', '1'), // Solid border color
                    getBarColor(results.quick).replace('0.7', '1'), 
                    getBarColor(results.cash).replace('0.7', '1')
                ],
                borderWidth: 2 // Border width for bars
            }]
        },
        options: {
            responsive: true, // Makes chart responsive
            animation: {
                duration: 1500, // Animation duration for chart
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true, // Y-axis starts at zero
                    grid: {
                        color: 'rgba(0,0,0,0.05)' // Light grid color
                    }
                },
                x: {
                    grid: {
                        display: false // Hides the grid on X-axis
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Hides legend
                },
                title: {
                    display: true,
                    text: 'Key Liquidity Ratios Analysis', // Chart title
                    font: {
                        size: 16 // Font size for title
                    },
                    padding: 20 // Padding around title
                }
            }
        }
    });
}








// Function to create a pie chart for current assets distribution
function createCurrentAssetsDistributionChart() {
    const ctx = document.getElementById('currentAssetsDistributionChart').getContext('2d');
    
    // Retrieve input values for cash balance and other assets
    const cashBalance = parseFloat(document.getElementById('cashBalance').value) || 0;
    const inventory = parseFloat(document.getElementById('inventory').value) || 0;
    const receivables = parseFloat(document.getElementById('receivables').value) || 0;
    const shortTermInvestments = parseFloat(document.getElementById('shortTermInvestments').value) || 0;
    const prepaidExpenses = parseFloat(document.getElementById('prepaidExpenses').value) || 0;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Cash', 'Inventory', 'Receivables', 'Short-term Investments', 'Prepaid Expenses'], // Pieces of pie
            datasets: [{
                data: [cashBalance, inventory, receivables, shortTermInvestments, prepaidExpenses], // Data values
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1 // Border width for pie slices
            }]
        },
        options: {
            responsive: true, // Makes chart responsive
            plugins: {
                title: {
                    display: true,
                    text: 'Current Assets Distribution' // Title for chart
                }
            }
        }
    });
}

// Function to create a line chart for trends in liquidity ratios
function createTrendsChart(results) {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'], // X-axis labels
            datasets: [
                {
                    label: 'Current Ratio Trend',
                    data: [results.current * 0.9, results.current * 0.95, results.current, results.current * 1.05], // Current ratio trend data
                    borderColor: 'rgba(75, 192, 192, 1)' // Line color for current ratio
                },
                {
                    label: 'Optimistic Scenario',
                    data: [
                        results.current * 1.1,
                        results.current * 1.15,
                        results.current * 1.2,
                        results.current * 1.25 // Predictive data for optimistic scenario
                    ],
                    borderColor: 'rgba(54, 162, 235, 1)' // Line color for optimistic scenario
                },
                {
                    label: 'Pessimistic Scenario',
                    data: [
                        results.current * 0.9,
                        results.current * 0.85,
                        results.current * 0.8,
                        results.current * 0.75 // Predictive data for pessimistic scenario
                    ],
                    borderColor: 'rgba(255, 99, 132, 1)' // Line color for pessimistic scenario
                }
            ]
        },
        options: {
            responsive: true, // Makes chart responsive
            scales: {
                y: {
                    beginAtZero: true // Y-axis starts at zero
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Trend and Sensitivity Analysis' // Title for trends chart
                }
            }
        }
    });
}
















// Function to create a radar chart for risk analysis
function createRiskAnalysisChart(results) {
    const ctx = document.getElementById('riskAnalysisChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Liquidity Risk', 'Operational Risk', 'Market Risk', 'Financial Risk', 'Structural Risk'], // Axis labels
            datasets: [{
                label: 'Risk Level',
                data: [
                    results.current < 1 ? 80 : results.current < 1.5 ? 60 : 40, // Liquidity risk score calculation
                    results.quick < 1 ? 75 : 50, // Operational risk score calculation
                    results.cash < 0.3 ? 70 : 45, // Market risk score calculation
                    65, // Fixed value for financial risk
                    results.current < 1.2 ? 70 : 50 // Structural risk score calculation
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Background color for radar area
                borderColor: 'rgba(255, 99, 132, 1)', // Border color for radar chart
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point background color
                pointBorderColor: '#fff', // Point border color
                pointHoverBackgroundColor: '#fff', // Hover background color for points
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)' // Hover border color for points
            }]
        },
        options: {
            responsive: true, // Makes chart responsive
            scales: {
                r: {
                    beginAtZero: true, // Radar axis starts at zero
                    max: 100 // Maximum value on the radar scale
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Risk Analysis' // Title for risk analysis chart
                }
            }
        }
    });
}

// Function to create a radar chart for liquidity depth analysis
function createLiquidityDepthChart(currentAssets, currentLiabilities, cashBalance, inventory) {
    const ctx = document.getElementById('liquidityDepthChart').getContext('2d');
    
    // Calculate liquidity depth metrics as percentages
    const cashToAssets = (cashBalance / currentAssets) * 100; // Percentage of cash to total assets
    const inventoryToAssets = (inventory / currentAssets) * 100; // Percentage of inventory to total assets
    const liquidityBuffer = ((currentAssets - currentLiabilities) / currentAssets) * 100; // Liquidity buffer percentage
    const quickAssetRatio = ((currentAssets - inventory) / currentAssets) * 100; // Quick asset ratio calculated

    new Chart(ctx, {
        type: 'radar', // Chart type: radar
        data: {
            labels: [
                'Cash to Assets Ratio', // Label for cash to assets
                'Inventory to Assets Ratio', // Label for inventory to assets
                'Liquidity Buffer', // Label for liquidity buffer
                'Quick Asset Ratio', // Label for quick asset ratio
                'Defensive Interval' // Placeholder for defensive interval
            ],
            datasets: [{
                label: 'Liquidity Depth Metrics (%)', // Data set label
                data: [
                    cashToAssets,
                    inventoryToAssets,
                    liquidityBuffer,
                    quickAssetRatio,
                    (cashToAssets + liquidityBuffer) / 2 // Average liquidity depth metric
                ],
                backgroundColor: 'rgba(63, 81, 181, 0.4)', // Background color of the radar chart
                borderColor: 'rgba(63, 81, 181, 1)', // Border color of the chart
                pointBackgroundColor: 'rgba(63, 81, 181, 1)', // Point color
                pointBorderColor: '#fff', // Point border color
                pointHoverBackgroundColor: '#fff', // Hover point background color
                pointHoverBorderColor: 'rgba(63, 81, 181, 1)' // Hover point border color
            }]
        },
        options: {
            responsive: true, // Makes chart responsive
            scales: {
                r: {
                    beginAtZero: true, // Y-axis starts from zero
                    max: 100, // Maximum scale value
                    ticks: {
                        stepSize: 20 // Step size for ticks on the radial scale
                    }
                }
            },
            plugins: {
                title: {
                    display: true, // Show title
                    text: 'Liquidity Depth Analysis', // Title text
                    font: { size: 16 } // Title font size
                },
                legend: {
                    position: 'bottom' // Position legend at the bottom
                }
            }
        }
    });
}












// Function to create a polar area chart for financial health indicators
function createFinancialHealthChart(financialHealthIndicators) {
    const ctx = document.getElementById('financialHealthChart').getContext('2d');
    
    // Extract values and labels from the financial indicators
    const labels = Object.keys(financialHealthIndicators).map(key => {
        switch(key) {
            case 'operatingCashFlow': return 'Operating Cash Flow'; // Mapping keys to labels
            case 'debtServiceCoverage': return 'Debt Service Coverage';
            case 'assetUtilizationEfficiency': return 'Asset Utilization Efficiency';
            default: return key; // Default case
        }
    });
    
    const values = Object.values(financialHealthIndicators).map(indicator => indicator.value); // Get values
    const statuses = Object.values(financialHealthIndicators).map(indicator => indicator.status); // Get statuses

    // Determine colors based on status
    const colors = statuses.map(status => {
        switch(status) {
            case 'Excellent': return 'rgba(76, 175, 80, 0.7)'; // Color for excellent status
            case 'Healthy': return 'rgba(33, 150, 243, 0.7)'; // Color for healthy status
            case 'High': return 'rgba(156, 39, 176, 0.7)'; // Color for high status
            default: return 'rgba(255, 152, 0, 0.7)'; // Default color for other statuses
        }
    });

    new Chart(ctx, {
        type: 'polarArea', // Chart type: polar area
        data: {
            labels: labels, // Labels for the chart
            datasets: [{
                data: values, // Data values
                backgroundColor: colors, // Background colors for each section
                borderColor: colors.map(color => color.replace('0.7', '1')), // Border color
                borderWidth: 1 // Border width
            }]
        },
        options: {
            responsive: true, // Makes chart responsive
            scales: {
                r: {
                    beginAtZero: true, // Start Y-axis from zero
                    ticks: {
                        stepSize: 20 // Step size for ticks
                    }
                }
            },
            plugins: {
                title: {
                    display: true, // Show title
                    text: 'Financial Health Indicators', // Title text
                    font: { size: 16 } // Title font size
                },
                legend: {
                    position: 'right', // Position legend to the right
                    labels: { padding: 20 } // Padding for legend labels
                }
            }
        }
    });
}

// Function to create a bar chart for scenario analysis
function createScenarioAnalysisChart(currentAssets, currentLiabilities, cashBalance) {
    const ctx = document.getElementById('scenarioAnalysisChart').getContext('2d');
    
    // Calculate baseline and scenarios
    const baselineRatio = currentAssets / currentLiabilities; // Baseline liquidity ratio
    const scenarios = {
        optimistic: {
            assets: currentAssets * 1.15, // Optimistic asset projection
            liabilities: currentLiabilities * 0.95, // Optimistic liability reduction
            cash: cashBalance * 1.2 // Optimistic cash increase
        },
        baseline: {
            assets: currentAssets, // No change for baseline
            liabilities: currentLiabilities,
            cash: cashBalance
        },
        pessimistic: {
            assets: currentAssets * 0.85, // Pessimistic asset projection
            liabilities: currentLiabilities * 1.05, // Pessimistic liability increase
            cash: cashBalance * 0.8 // Pessimistic cash reduction
        }
    };

    // Calculate liquidity ratios for each scenario
    const ratios = {
        optimistic: scenarios.optimistic.assets / scenarios.optimistic.liabilities,
        baseline: baselineRatio,
        pessimistic: scenarios.pessimistic.assets / scenarios.pessimistic.liabilities
    };

    new Chart(ctx, {
        type: 'bar', // Chart type: bar
        data: {
            labels: ['Optimistic Scenario', 'Baseline', 'Pessimistic Scenario'], // Labels for scenarios
            datasets: [
                {
                    label: 'Liquidity Ratio',
                    data: [
                        ratios.optimistic,
                        ratios.baseline,
                        ratios.pessimistic // Data for each scenario
                    ],
                    backgroundColor: [
                        ratios.optimistic > 1 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
                        ratios.baseline > 1 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
                        ratios.pessimistic > 1 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)'
                    ],
                    borderColor: [
                        ratios.optimistic > 1 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)',
                        ratios.baseline > 1 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)',
                        ratios.pessimistic > 1 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 2 // Border width for ratios
                },
                {
                    label: 'Cash Reserve', // Additional dataset for cash reserve
                    data: [
                        scenarios.optimistic.cash / scenarios.optimistic.liabilities,
                        scenarios.baseline.cash / scenarios.baseline.liabilities,
                        scenarios.pessimistic.cash / scenarios.pessimistic.liabilities
                    ],
                    backgroundColor: [
                        scenarios.optimistic.cash / scenarios.optimistic.liabilities > 0.2 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
                        scenarios.baseline.cash / scenarios.baseline.liabilities > 0.2 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
                        scenarios.pessimistic.cash / scenarios.pessimistic.liabilities > 0.2 ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)'
                    ],
                    borderColor: [
                        scenarios.optimistic.cash / scenarios.optimistic.liabilities > 0.2 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)',
                        scenarios.baseline.cash / scenarios.baseline.liabilities > 0.2 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)',
                        scenarios.pessimistic.cash / scenarios.pessimistic.liabilities > 0.2 ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 2 // Border width for cash reserves
                }
            ]
        },
        options: {
            responsive: true, // Makes chart responsive
            scales: {
                y: {
                    beginAtZero: true, // Y-axis starts from zero
                    title: {
                        display: true,
                        text: 'Financial Metrics' // Y-axis title
                    }
                }
            },
            plugins: {
                title: {
                    display: true, // Show title
                    text: 'Scenario Analysis', // Title text
                    font: { size: 16 } // Title font size
                },
                legend: {
                    position: 'bottom', // Position legend at the bottom
                    labels: {
                        padding: 20 // Padding for legend labels
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || ''; // Initialize label text
                            if (label) {
                                label += ': '; // Add colon if label exists
                            }
                            label += context.parsed.y.toFixed(2); // Format display value
                            return label; // Return the formatted label
                        }
                    }
                }
            }
        }
    });
}











// Function to create a comparative trend chart
function createComparativeTrendChart(results) {
    const ctx = document.getElementById('comparativeTrendChart').getContext('2d');
    
    // Define industry averages for comparison
    const industryCurrentRatio = 1.5; // Industry average for current ratio
    const industryQuickRatio = 1.0; // Industry average for quick ratio
    const industryCashRatio = 0.2; // Industry average for cash ratio
    
    // Calculate peer comparison data based on industry averages
    const peerComparison = {
        current: results.current / industryCurrentRatio, // Comparison for current ratio
        quick: results.quick / industryQuickRatio, // Comparison for quick ratio
        cash: results.cash / industryCashRatio // Comparison for cash ratio
    };

    new Chart(ctx, {
        type: 'bar', // Chart type: bar
        data: {
            labels: ['Current Ratio', 'Quick Ratio', 'Cash Ratio'], // Labels for the bar chart
            datasets: [
                {
                    label: 'Current Ratios', // Dataset label
                    data: [results.current, results.quick, results.cash], // Data values
                    backgroundColor: [
                        results.current > industryCurrentRatio ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
                        results.quick > industryQuickRatio ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)',
                        results.cash > industryCashRatio ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)'
                    ],
                    borderColor: [
                        results.current > industryCurrentRatio ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)',
                        results.quick > industryQuickRatio ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)',
                        results.cash > industryCashRatio ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 2 // Border width for bars
                },
                {
                    label: 'Industry Average', // Second dataset for industry average
                    data: [industryCurrentRatio, industryQuickRatio, industryCashRatio], // Data values for average
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)', // Color for industry average bars
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 99, 132, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', // Border color for average
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 2 // Border width for average bars
                }
            ]
        },
        options: {
            responsive: true, // Makes chart responsive
            scales: {
                y: {
                    beginAtZero: true, // Y-axis starts from zero
                    title: {
                        display: true,
                        text: 'Financial Metrics' // Y-axis title
                    }
                }
            },
            plugins: {
                title: {
                    display: true, // Show title
                    text: 'Comparative Trend Analysis', // Title text
                    font: { size: 16 } // Title font size
                },
                legend: {
                    position: 'bottom' // Position legend at the bottom
                }
            }
        }
    });
}









// Function to generate recommendations based on the current ratio
function generateCurrentRatioRecommendations(currentRatio) {
    let recommendations = []; // Array to store recommendations
    
    // If the ratio is less than 1, this indicates a liquidity deficiency
    if (currentRatio < 1) {
        recommendations = [
            'Increase current assets through inventory management and accounts receivable collection',
            'Restructure short-term liabilities',
            'Improve working capital management',
            'Consider opportunities for capital increase or additional financing'
        ];
    // If the ratio is less than 1.5 but greater than or equal to 1
    } else if (currentRatio < 1.5) {
        recommendations = [
            'Monitor current ratio levels',
            'Improve operational efficiency',
            'Enhance cash flow management',
            'Review and adjust inventory management'
        ];
    // If the ratio is 1.5 or higher
    } else {
        recommendations = [
            'Maintain current ratio level',
            'Invest surplus in short-term opportunities',
            'Consider business expansion',
            'Improve return on current assets'
        ];
    }
    
    return recommendations; // Return the list of recommendations
}

// Function to display analysis of the current ratio
function displayCurrentRatioAnalysis(currentRatio, currentAssets, currentLiabilities) {
    const resultsContainer = document.getElementById('resultsContainer'); // Get the DOM element to display results
    const status = getMetricStatus(currentRatio, 'current')[0]; // Get the status of the ratio
    const statusClass = getMetricStatus(currentRatio, 'current')[1]; // Get the class associated with the status
    
    let interpretation = ''; // For displaying interpretation
    // Determine interpretation based on the ratio value
    if (currentRatio >= 2) {
        interpretation = 'Excellent liquidity position indicating strong ability to cover short-term obligations';
    } else if (currentRatio >= 1.5) {
        interpretation = 'Good liquidity position with appropriate safety margin';
    } else if (currentRatio >= 1) {
        interpretation = 'Acceptable liquidity position but requires monitoring';
    } else {
        interpretation = 'Critical liquidity position requiring urgent corrective actions';
    }

    const recommendations = generateCurrentRatioRecommendations(currentRatio); // Get recommendations
    const workingCapital = currentAssets - currentLiabilities; // Calculate working capital

    // Create HTML to display the analysis
    let html = `
        <div class="comprehensive-analysis">
            <div class="analysis-group theme-1">
                <h4 class="group-title">
                    <i class="fas fa-chart-line"></i>
                    Current Ratio Analysis
                </h4>
                
                <div class="current-ratio-analysis">
                    <div class="analysis-card">
                        <h5>Current Ratio</h5>
                        <div class="metric-value ${currentRatio >= 1 ? 'profit' : 'loss'}">
                            ${currentRatio.toFixed(2)} 
                        </div>
                        <div class="status-indicator ${statusClass}">
                            ${status}
                        </div>
                    </div>

                    <div class="analysis-card">
                        <h5>Working Capital</h5>
                        <div class="metric-value ${workingCapital >= 0 ? 'profit' : 'loss'}">
                            ${workingCapital.toLocaleString()} 
                        </div>
                        <p>Difference between current assets and liabilities</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Interpretation</h5>
                        <p>${interpretation}</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Recommendations</h5>
                        <ul>
                            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="chart-card">
                <h4>Current Ratio Components</h4>
                <canvas id="currentRatioComponentsChart"></canvas>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = html; // Insert HTML into the results element
    createCurrentRatioComponentsChart(currentAssets, currentLiabilities); // Call function to create the components chart
}

// Function to create a chart for the components of the current ratio
function createCurrentRatioComponentsChart(currentAssets, currentLiabilities) {
    const ctx = document.getElementById('currentRatioComponentsChart').getContext('2d'); // Get the chart context
    
    // Set up the chart using the Chart.js library
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Current Assets', 'Current Liabilities'],
            datasets: [{
                label: 'Values',
                data: [currentAssets, currentLiabilities],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)', // Color for current assets
                    'rgba(255, 99, 132, 0.7)'  // Color for current liabilities
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value' // Y-axis title
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Current Ratio Components',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false // Hide chart legend
                }
            }
        }
    });
}

// Function to display analysis of the quick ratio
function displayQuickRatioAnalysis(quickRatio, currentAssets, inventory, currentLiabilities) {
    const resultsContainer = document.getElementById('resultsContainer'); // Get the DOM element to display results
    const status = getMetricStatus(quickRatio, 'quick')[0]; // Get the status of the ratio 
    const statusClass = getMetricStatus(quickRatio, 'quick')[1]; // Get the class associated with the status

    let interpretation = ''; // For displaying interpretation
    // Determine interpretation based on the ratio value
    if (quickRatio >= 1) {
        interpretation = 'Excellent liquidity position with strong ability to cover short-term obligations without relying on inventory';
    } else if (quickRatio >= 0.7) {
        interpretation = 'Good liquidity position with ability to cover short-term obligations, but requires monitoring';
    } else {
        interpretation = 'Critical liquidity position requiring urgent corrective actions to improve quick liquidity';
    }

    const recommendations = generateQuickRatioRecommendations(quickRatio); // Get recommendations
    const quickAssets = currentAssets - inventory; // Calculate quick assets

    // Create HTML to display the analysis
    let html = `
        <div class="comprehensive-analysis">
            <div class="analysis-group theme-2">
                <h4 class="group-title">
                    <i class="fas fa-bolt"></i>
                    Quick Ratio Analysis
                </h4>
                
                <div class="current-ratio-analysis">
                    <div class="analysis-card">
                        <h5>Quick Ratio</h5>
                        <div class="metric-value ${quickRatio >= 0.7 ? 'profit' : 'loss'}">
                            ${quickRatio.toFixed(2)} // Display the quick ratio value formatted to two decimal places
                        </div>
                        <div class="status-indicator ${statusClass}">
                            ${status}
                        </div>
                    </div>

                    <div class="analysis-card">
                        <h5>Quick Assets</h5>
                        <div class="metric-value ${quickAssets >= currentLiabilities ? 'profit' : 'loss'}">
                            ${quickAssets.toLocaleString()} 
                        </div>
                        <p>Current assets minus inventory</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Inventory to Current Assets Ratio</h5>
                        <div class="metric-value ${(inventory/currentAssets) <= 0.5 ? 'profit' : 'loss'}">
                            ${((inventory/currentAssets) * 100).toFixed(2)}%
                        </div>
                        <p>Proportion of inventory in current assets</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Interpretation</h5>
                        <p>${interpretation}</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Recommendations</h5>
                        <ul>
                            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="chart-card">
                <h4>Quick Ratio Components</h4>
                <canvas id="quickRatioComponentsChart"></canvas>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = html;
    createCurrentRatioComponentsChart(currentAssets, currentLiabilities);
}



function createCurrentRatioComponentsChart(currentAssets, currentLiabilities) {
    const ctx = document.getElementById('currentRatioComponentsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Current Assets', 'Current Liabilities'],
            datasets: [{
                label: 'Values',
                data: [currentAssets, currentLiabilities],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Current Ratio Components',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
}






function displayQuickRatioAnalysis(quickRatio, currentAssets, inventory, currentLiabilities) {
    const resultsContainer = document.getElementById('resultsContainer');
    const status = getMetricStatus(quickRatio, 'quick')[0];
    const statusClass = getMetricStatus(quickRatio, 'quick')[1];
    
    
    
    let interpretation = '';
    
    if (quickRatio >= 1) {
        interpretation = 'Excellent liquidity position with strong ability to cover short-term obligations without relying on inventory';
    } else if (quickRatio >= 0.7) {
        interpretation = 'Good liquidity position with ability to cover short-term obligations, but requires monitoring';
    } else {
        interpretation = 'Critical liquidity position requiring urgent corrective actions to improve quick liquidity';
    }
    
    
    // If the ratio is less than 0.7, this indicates a liquidity deficiency
    const recommendations = generateQuickRatioRecommendations(quickRatio);
    const quickAssets = currentAssets - inventory;

    let html = `
        <div class="comprehensive-analysis">
            <div class="analysis-group theme-2">
                <h4 class="group-title">
                    <i class="fas fa-bolt"></i>
                    Quick Ratio Analysis
                </h4>
                
                <div class="current-ratio-analysis">
                    <div class="analysis-card">
                        <h5>Quick Ratio</h5>
                        <div class="metric-value ${quickRatio >= 0.7 ? 'profit' : 'loss'}">
                            ${quickRatio.toFixed(2)}
                        </div>
                        <div class="status-indicator ${statusClass}">
                            ${status}
                        </div>
                    </div>

                    <div class="analysis-card">
                        <h5>Quick Assets</h5>
                        <div class="metric-value ${quickAssets >= currentLiabilities ? 'profit' : 'loss'}">
                            ${quickAssets.toLocaleString()} 
                        </div>
                        <p>Current assets minus inventory</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Inventory to Current Assets Ratio</h5>
                        <div class="metric-value ${(inventory/currentAssets) <= 0.5 ? 'profit' : 'loss'}">
                            ${((inventory/currentAssets) * 100).toFixed(2)}%
                        </div>
                        <p>Proportion of inventory in current assets</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Interpretation</h5>
                        <p>${interpretation}</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Recommendations</h5>
                        <ul>
                            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="chart-card">
                <h4>Quick Ratio Components</h4>
                <canvas id="quickRatioComponentsChart"></canvas>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = html;
    createQuickRatioComponentsChart(quickAssets, inventory, currentLiabilities);
}



// Function to generate recommendations based on the quick ratio
function generateQuickRatioRecommendations(quickRatio) {
    let recommendations = [];
    
    // If the ratio is less than 1 but greater than or equal to 0.7
    if (quickRatio < 0.7) {
        recommendations = [
            'Improve accounts receivable collection and accelerate collection cycle',
            'Reduce reliance on inventory for liability coverage',
            'Increase cash liquidity and short-term investments',
            'Renegotiate payment terms with suppliers',
            'Consider liquidating non-essential assets'
        ];
    }
    // If the ratio is 1 or higher
     else if (quickRatio < 1) {
        recommendations = [
            'Monitor quick ratio levels periodically',
            'Improve working capital management efficiency',
            'Develop plan to gradually enhance quick liquidity',
            'Improve inventory management to reduce dependence'
        ];
    } else {
        recommendations = [
            'Maintain good quick ratio level',
            'Invest surplus in short-term opportunities',
            'Consider business expansion opportunities',
            'Improve return on liquid assets'
        ];
    }
    
    return recommendations;
}

// Function to create a bar chart for Quick Ratio components
function createQuickRatioComponentsChart(quickAssets, inventory, currentLiabilities) {
    // Get the canvas context by its ID for rendering the chart
    const ctx = document.getElementById('quickRatioComponentsChart').getContext('2d');

    // Create a new Chart instance
    new Chart(ctx, {
        type: 'bar', // Set the chart type to 'bar'
        data: {
            labels: ['Quick Assets', 'Inventory', 'Current Liabilities'], // Labels for the bars
            datasets: [{
                label: 'Values', // Label for the dataset
                data: [quickAssets, inventory, currentLiabilities], // Data values for the chart
                backgroundColor: [ // Bar colors with transparency
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderColor: [ // Border colors for the bars
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2 // Width of bar borders
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            scales: {
                y: {
                    beginAtZero: true, // Start y-axis at zero
                    title: {
                        display: true, // Display the y-axis title
                        text: 'Value' // Y-axis title text
                    }
                }
            },
            plugins: {
                title: {
                    display: true, // Show the chart title
                    text: 'Quick Ratio Components', // Title text
                    font: {
                        size: 16 // Title font size
                    }
                },
                legend: {
                    display: false // Hide the legend
                }
            }
        }
    });
}




// Function to display analysis of the Cash Ratio
function displayCashRatioAnalysis(cashRatio, cashBalance, shortTermInvestments, currentLiabilities) {
    const resultsContainer = document.getElementById('resultsContainer'); // Container for results
    const status = getMetricStatus(cashRatio, 'cash')[0]; // Get status based on cash ratio
    const statusClass = getMetricStatus(cashRatio, 'cash')[1]; // Get CSS class for status

    // Interpret cash ratio based on value
    let interpretation = '';
    if (cashRatio >= 0.3) {
        interpretation = 'Excellent cash position indicating strong ability to cover short-term obligations with cash';
    } else if (cashRatio >= 0.2) {
        interpretation = 'Good cash position with ability to cover short-term obligations, but requires monitoring';
    } else {
        interpretation = 'Critical cash position requiring urgent corrective actions to improve cash liquidity';
    }

    const recommendations = generateCashRatioRecommendations(cashRatio); // Generate recommendations
    const totalCashEquivalents = cashBalance + shortTermInvestments; // Calculate total cash equivalents

    // Prepare HTML for displaying the results
    let html = `
        <div class="comprehensive-analysis">
            <div class="analysis-group theme-3">
                <h4 class="group-title">
                    <i class="fas fa-money-bill-wave"></i>
                    Cash Ratio Analysis
                </h4>
                
                <div class="current-ratio-analysis">
                    <div class="analysis-card">
                        <h5>Cash Ratio</h5>
                        <div class="metric-value ${cashRatio >= 0.2 ? 'profit' : 'loss'}">
                            ${cashRatio.toFixed(2)} <!-- Display cash ratio with two decimal places -->
                        </div>
                        <div class="status-indicator ${statusClass}">
                            ${status} <!-- Display cash ratio status -->
                        </div>
                    </div>

                    <div class="analysis-card">
                        <h5>Total Cash Equivalents</h5>
                        <div class="metric-value ${totalCashEquivalents >= (currentLiabilities * 0.2) ? 'profit' : 'loss'}">
                            ${totalCashEquivalents.toLocaleString()} <!-- Format total cash equivalents -->
                        </div>
                        <p>Cash plus short-term investments</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Cash Coverage of Current Liabilities</h5>
                        <div class="metric-value ${(totalCashEquivalents/currentLiabilities) >= 0.2 ? 'profit' : 'loss'}">
                            ${((totalCashEquivalents/currentLiabilities) * 100).toFixed(2)}% <!-- Coverage percentage -->
                        </div>
                        <p>Proportion of current liabilities covered by cash</p>
                    </div>

                    <div class="analysis-card">
                        <h5>Interpretation</h5>
                        <p>${interpretation}</p> <!-- Interpretation of cash ratio -->
                    </div>

                    <div class="analysis-card">
                        <h5>Recommendations</h5>
                        <ul>
                            ${recommendations.map(rec => `<li>${rec}</li>`).join('')} <!-- List recommendations -->
                        </ul>
                    </div>
                </div>
            </div>

            <div class="chart-card">
                <h4>Cash Ratio Components</h4>
                <canvas id="cashRatioComponentsChart"></canvas> <!-- Canvas for cash ratio chart -->
            </div>
        </div>
    `;

    resultsContainer.innerHTML = html; // Insert results HTML into the container
    createCashRatioComponentsChart(cashBalance, shortTermInvestments, currentLiabilities); // Create cash ratio components chart
}


// Function to generate recommendations based on cash ratio
function generateCashRatioRecommendations(cashRatio) {
    let recommendations = [];

    // Recommendations based on cash ratio value
    if (cashRatio < 0.2) {
        recommendations = [
            'Improve cash flow management and accelerate collection cycle',
            'Reduce non-essential expenses and rationalize spending',
            'Consider liquidating some short-term investments',
            'Develop cash contingency plan',
            'Renegotiate payment terms with suppliers'
        ];
    } else if (cashRatio < 0.3) {
        recommendations = [
            'Monitor cash levels regularly',
            'Improve cash management efficiency',
            'Build emergency cash reserves',
            'Develop cash flow forecasting system'
        ];
    } else {
        recommendations = [
            'Invest excess cash in short-term opportunities',
            'Consider business expansion opportunities',
            'Improve return on available cash',
            'Develop surplus liquidity management strategy'
        ];
    }

    return recommendations; // Return the generated recommendations
}

// Function to create a bar chart for Cash Ratio components
function createCashRatioComponentsChart(cashBalance, shortTermInvestments, currentLiabilities) {
    const ctx = document.getElementById('cashRatioComponentsChart').getContext('2d'); // Get canvas context for the chart

    // Create a new Chart instance
    new Chart(ctx, {
        type: 'bar', // Set the chart type to 'bar'
        data: {
            labels: ['Cash', 'Short-term Investments', 'Current Liabilities'], // Labels for the cash ratio components
            datasets: [{
                label: 'Values', // Label for the dataset
                data: [cashBalance, shortTermInvestments, currentLiabilities], // Data values for the chart
                backgroundColor: [ // Bar colors with transparency
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)'
                ],
                borderColor: [ // Border colors for the bars
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2 // Width of bar borders
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            scales: {
                y: {
                    beginAtZero: true, // Start y-axis at zero
                    title: {
                        display: true, // Display the y-axis title
                        text: 'Value' // Y-axis title text
                    }
                }
            },
            plugins: {
                title: {
                    display: true, // Show the chart title
                    text: 'Cash Ratio Components', // Title text
                    font: {
                        size: 16 // Title font size
                    }
                },
                legend: {
                    display: false // Hide the legend
                }
            }
        }
    });
}



function exportToPDF() {
    const content = document.getElementById('resultsContainer');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
            <head>
                <title>Financial Liquidity Analysis Report</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .profit { color: #28a745; }
                    .loss { color: #dc3545; }
                    .analysis-card {
                        margin: 15px 0;
                        padding: 15px;
                        border: 1px solid #ddd;
                    }
                    .metric-value {
                        font-size: 1.2em;
                        font-weight: bold;
                    }
                    @media print {
                        body { padding: 0; }
                        button { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Financial Liquidity Analysis Report</h1>
                    <p>${new Date().toLocaleDateString()}</p>
                </div>
                ${content.innerHTML}
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="window.print()">Print Report</button>
                </div>
            </body>
        </html>
    `);
}

function addExportButtons(container) {
    const exportButtons = `
        <div class="export-buttons">
            <button onclick="exportToPDF()" class="export-btn pdf">
                <i class="fas fa-file-pdf"></i>
                Export to PDF
            </button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', exportButtons);
}



// Export To PDF
function printInvoice() {
  window.print();
}



// End of app.js


