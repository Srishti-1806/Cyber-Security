"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Lock, Shield, Zap, Wifi, Database, Globe, AlertTriangle } from "lucide-react"

export function SecurityInformation() {
  const [activeTab, setActiveTab] = useState("malware")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="cyber-border overflow-hidden">
        <CardHeader>
          <CardTitle>Security Threat Information</CardTitle>
          <CardDescription>
            Learn about common security threats, their impacts, and how to protect your systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="malware" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="malware" className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                <span>Malware</span>
              </TabsTrigger>
              <TabsTrigger value="bruteforce" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Brute Force</span>
              </TabsTrigger>
              <TabsTrigger value="ddos" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>DDoS</span>
              </TabsTrigger>
              <TabsTrigger value="others" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Other Threats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="malware" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/20">
                    <Bug className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">Malware</h3>
                </div>

                <p>
                  Malware (malicious software) is any program or file that is harmful to a computer user. Types of
                  malware include computer viruses, worms, Trojan horses, ransomware, and spyware.
                </p>

                <h4 className="text-lg font-semibold mt-4">Impact on Security</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Data theft and loss of sensitive information</li>
                  <li>System performance degradation and crashes</li>
                  <li>Unauthorized access to systems and networks</li>
                  <li>Financial losses through ransomware payments</li>
                  <li>Damage to organization reputation and customer trust</li>
                </ul>

                <h4 className="text-lg font-semibold mt-4">Common Types</h4>
                <div className="grid gap-4 md:grid-cols-2 mt-2">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Ransomware</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Encrypts files and demands payment for decryption keys. Can cause complete operational shutdown
                        and significant financial damage.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Spyware</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Secretly monitors user activity and collects sensitive data. Can lead to identity theft and
                        privacy violations.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Trojans</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Disguised as legitimate software but contains malicious code. Creates backdoors for attackers to
                        access systems.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Worms</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Self-replicating malware that spreads across networks without user interaction. Can cause
                        network congestion and system failures.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h4 className="text-lg font-semibold mt-4">Protection Measures</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Keep all software and operating systems updated</li>
                  <li>Use reputable antivirus and anti-malware software</li>
                  <li>Implement email filtering and web content filtering</li>
                  <li>Regular data backups stored offline or in secure cloud storage</li>
                  <li>User education on recognizing phishing attempts and suspicious files</li>
                  <li>Application whitelisting and least privilege access principles</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="bruteforce" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
                    <Lock className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold">Brute Force Attacks</h3>
                </div>

                <p>
                  Brute force attacks involve repeatedly trying different passwords or combinations until the correct
                  one is found. These attacks attempt to crack passwords through exhaustive effort rather than
                  intellectual strategies.
                </p>

                <h4 className="text-lg font-semibold mt-4">Impact on Security</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unauthorized access to user accounts and sensitive systems</li>
                  <li>Compromise of administrator credentials leading to complete system takeover</li>
                  <li>Data breaches and exposure of sensitive information</li>
                  <li>Service disruption due to account lockouts</li>
                  <li>Potential for lateral movement through networks once initial access is gained</li>
                </ul>

                <h4 className="text-lg font-semibold mt-4">Common Types</h4>
                <div className="grid gap-4 md:grid-cols-2 mt-2">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Simple Brute Force</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Systematically checks all possible passwords until the correct one is found. Effective against
                        short or simple passwords.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Dictionary Attack</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Uses a list of common words, phrases, and known passwords. Exploits the human tendency to use
                        meaningful, memorable passwords.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Credential Stuffing</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Uses previously breached username/password combinations across multiple sites. Exploits password
                        reuse across services.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Rainbow Table Attack</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Uses precomputed tables to crack password hashes more efficiently. Effective against unsalted
                        password hashes.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h4 className="text-lg font-semibold mt-4">Protection Measures</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implement strong password policies (length, complexity, regular changes)</li>
                  <li>Use multi-factor authentication (MFA) wherever possible</li>
                  <li>Implement account lockout policies after multiple failed attempts</li>
                  <li>Use CAPTCHA to prevent automated login attempts</li>
                  <li>Implement login attempt rate limiting</li>
                  <li>Use properly salted password hashing algorithms</li>
                  <li>Monitor and alert on unusual login patterns or multiple failed attempts</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="ddos" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">DDoS Attacks</h3>
                </div>

                <p>
                  Distributed Denial of Service (DDoS) attacks attempt to disrupt normal traffic to a targeted server,
                  service, or network by overwhelming the target or its surrounding infrastructure with a flood of
                  Internet traffic.
                </p>

                <h4 className="text-lg font-semibold mt-4">Impact on Security</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service unavailability and downtime</li>
                  <li>Loss of business and revenue during outages</li>
                  <li>Damage to brand reputation and customer trust</li>
                  <li>Increased operational costs for mitigation and recovery</li>
                  <li>Potential for DDoS to be used as a smokescreen for other attacks</li>
                </ul>

                <h4 className="text-lg font-semibold mt-4">Common Types</h4>
                <div className="grid gap-4 md:grid-cols-2 mt-2">
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Volume-Based Attacks</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Includes UDP floods, ICMP floods, and other spoofed-packet floods. Saturates bandwidth of the
                        target site.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Protocol Attacks</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Includes SYN floods, fragmented packet attacks, and Ping of Death. Consumes server resources or
                        those of intermediate communication equipment.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Application Layer Attacks</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Targets web application vulnerabilities with seemingly legitimate requests. Hard to detect and
                        can be effective with fewer resources than other attacks.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">Amplification Attacks</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Exploits vulnerable servers to multiply traffic directed at the target. Uses DNS, NTP, or
                        memcached servers to amplify attack volume.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h4 className="text-lg font-semibold mt-4">Protection Measures</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use DDoS protection services and content delivery networks (CDNs)</li>
                  <li>Implement rate limiting and traffic filtering</li>
                  <li>Ensure network architecture is redundant and scalable</li>
                  <li>Develop and regularly test a DDoS response plan</li>
                  <li>Monitor network traffic for early detection of attacks</li>
                  <li>Configure network hardware against common DDoS techniques</li>
                  <li>Work with ISPs that offer DDoS mitigation capabilities</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="others" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Other Common Threats</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2 mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-semibold">Man-in-the-Middle Attacks</h4>
                    </div>
                    <p>
                      Attackers secretly relay and possibly alter communications between two parties. This allows them
                      to eavesdrop on sensitive information or inject malicious content.
                    </p>
                    <h5 className="font-medium">Impact:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Data theft and credential compromise</li>
                      <li>Session hijacking and unauthorized transactions</li>
                      <li>Injection of malicious content or commands</li>
                    </ul>
                    <h5 className="font-medium">Protection:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Use HTTPS and TLS for all communications</li>
                      <li>Implement certificate pinning</li>
                      <li>Avoid using public Wi-Fi for sensitive transactions</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-semibold">SQL Injection</h4>
                    </div>
                    <p>
                      Attackers insert malicious SQL code into database queries through unsanitized input fields. This
                      can allow them to access, modify, or delete database information.
                    </p>
                    <h5 className="font-medium">Impact:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Unauthorized access to sensitive data</li>
                      <li>Database corruption or deletion</li>
                      <li>Privilege escalation within applications</li>
                    </ul>
                    <h5 className="font-medium">Protection:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Use parameterized queries and prepared statements</li>
                      <li>Implement input validation and sanitization</li>
                      <li>Apply principle of least privilege for database accounts</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-semibold">Cross-Site Scripting (XSS)</h4>
                    </div>
                    <p>
                      Attackers inject malicious scripts into websites viewed by other users. These scripts can steal
                      cookies, session tokens, or other sensitive information.
                    </p>
                    <h5 className="font-medium">Impact:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Session hijacking and identity theft</li>
                      <li>Defacement of websites</li>
                      <li>Distribution of malware to site visitors</li>
                    </ul>
                    <h5 className="font-medium">Protection:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Implement Content Security Policy (CSP)</li>
                      <li>Sanitize and validate all user inputs</li>
                      <li>Use modern frameworks that automatically escape output</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-semibold">Social Engineering</h4>
                    </div>
                    <p>
                      Psychological manipulation to trick users into making security mistakes or giving away sensitive
                      information. Includes phishing, pretexting, baiting, and other techniques.
                    </p>
                    <h5 className="font-medium">Impact:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Credential theft and account compromise</li>
                      <li>Installation of malware through deception</li>
                      <li>Unauthorized access to physical facilities</li>
                    </ul>
                    <h5 className="font-medium">Protection:</h5>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Regular security awareness training</li>
                      <li>Implement verification procedures for sensitive requests</li>
                      <li>Use email filtering and anti-phishing tools</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
