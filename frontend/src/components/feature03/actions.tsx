case 'actions':
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleQuarantine}
                variant={isQuarantined ? "outline" : "default"}
                className={isQuarantined ? "border-orange-500 text-orange-600 hover:bg-orange-50" : "bg-orange-500 hover:bg-orange-600"}
              >
                <Shield className="w-4 h-4 mr-2" />
                {isQuarantined ? "Remove from Quarantine" : "Quarantine Agent"}
              </Button>
              
              <Button
                onClick={handleRunScan}
                disabled={isScanning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Run Security Scan"}
              </Button>
              
              {isScanning && (
                <div className="flex items-center gap-3 ml-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(scanProgress, 98)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{Math.round(scanProgress)}%</span>
                </div>
              )}
            </div>
            
            {scanProgress === 100 && !isScanning && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Scan completed successfully!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">No threats detected. System is secure.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Restart Agent Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HardDrive className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Advanced Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Network className="w-4 h-4 mr-2" />
                    Test Connectivity
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Force Uninstall
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );