import { QuestionType } from '../../types/quiz';

export const networksQuestions: QuestionType[] = [
  {
    text: "What does OSI stand for in the context of networking models?",
    options: [
      { text: "Open System Interconnection", isCorrect: true },
      { text: "Operating System Interface", isCorrect: false },
      { text: "Optical System Integration", isCorrect: false },
      { text: "Open Security Infrastructure", isCorrect: false }
    ],
    explanation: "OSI stands for Open System Interconnection. It is a conceptual model that standardizes the communication functions of a telecommunication or computing system without regard to its underlying internal structure and technology."
  },
  {
    text: "Which of the following is NOT a layer in the OSI model?",
    options: [
      { text: "Physical Layer", isCorrect: false },
      { text: "Security Layer", isCorrect: true },
      { text: "Transport Layer", isCorrect: false },
      { text: "Application Layer", isCorrect: false }
    ],
    explanation: "The Security Layer is not one of the seven layers of the OSI model. The seven layers are: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
  },
  {
    text: "What is the primary function of the Network Layer in the OSI model?",
    options: [
      { text: "Error detection and correction", isCorrect: false },
      { text: "Data encryption and decryption", isCorrect: false },
      { text: "Routing and forwarding of data packets", isCorrect: true },
      { text: "Establishing end-to-end connections", isCorrect: false }
    ],
    explanation: "The Network Layer (Layer 3) of the OSI model is responsible for packet forwarding, including routing through intermediate routers. It handles addressing, routing, and logical addressing (IP addresses)."
  },
  {
    text: "Which protocol operates at the Network Layer of the OSI model?",
    options: [
      { text: "HTTP", isCorrect: false },
      { text: "TCP", isCorrect: false },
      { text: "IP", isCorrect: true },
      { text: "Ethernet", isCorrect: false }
    ],
    explanation: "IP (Internet Protocol) operates at the Network Layer (Layer 3) of the OSI model. It is responsible for delivering packets from the source host to the destination host based on the IP addresses."
  },
  {
    text: "What is a subnet mask used for?",
    options: [
      { text: "To encrypt data packets", isCorrect: false },
      { text: "To identify which portion of an IP address refers to the network address", isCorrect: true },
      { text: "To block unwanted network traffic", isCorrect: false },
      { text: "To increase network speed", isCorrect: false }
    ],
    explanation: "A subnet mask is used to identify which portion of an IP address refers to the network address and which portion refers to the host address. It helps in dividing a network into subnets."
  },
  {
    text: "What is the purpose of the DNS protocol?",
    options: [
      { text: "To assign IP addresses to network devices", isCorrect: false },
      { text: "To translate domain names to IP addresses", isCorrect: true },
      { text: "To encrypt network traffic", isCorrect: false },
      { text: "To route packets across networks", isCorrect: false }
    ],
    explanation: "DNS (Domain Name System) is a protocol that translates human-readable domain names (like www.example.com) into IP addresses that computers use to identify each other on the network."
  },
  {
    text: "Which of the following is a valid IPv4 address?",
    options: [
      { text: "192.168.1.256", isCorrect: false },
      { text: "2001:0db8:85a3:0000:0000:8a2e:0370:7334", isCorrect: false },
      { text: "172.16.254.1", isCorrect: true },
      { text: "300.168.1.1", isCorrect: false }
    ],
    explanation: "172.16.254.1 is a valid IPv4 address. IPv4 addresses consist of four octets (8 bits each), with values ranging from 0 to 255. The other options are either outside this range or are IPv6 format."
  },
  {
    text: "What is the maximum number of hosts possible in a /24 network?",
    options: [
      { text: "254", isCorrect: true },
      { text: "255", isCorrect: false },
      { text: "256", isCorrect: false },
      { text: "253", isCorrect: false }
    ],
    explanation: "A /24 network (with a subnet mask of 255.255.255.0) has 8 bits for host addressing, allowing for 2^8 = 256 addresses. However, two addresses are reserved (network address and broadcast address), leaving 254 usable host addresses."
  },
  {
    text: "Which protocol is used to automatically assign IP addresses to devices on a network?",
    options: [
      { text: "DNS", isCorrect: false },
      { text: "DHCP", isCorrect: true },
      { text: "HTTP", isCorrect: false },
      { text: "FTP", isCorrect: false }
    ],
    explanation: "DHCP (Dynamic Host Configuration Protocol) is used to automatically assign IP addresses and other network configuration information to devices on a network, eliminating the need for manual configuration."
  },
  {
    text: "What is the purpose of NAT in networking?",
    options: [
      { text: "To translate between different network protocols", isCorrect: false },
      { text: "To translate private IP addresses to public IP addresses", isCorrect: true },
      { text: "To improve network security by encrypting data", isCorrect: false },
      { text: "To increase network bandwidth", isCorrect: false }
    ],
    explanation: "NAT (Network Address Translation) is used to translate private IP addresses (like those in a home or office network) to a public IP address, allowing multiple devices to share a single public IP address for internet access."
  },
  {
    text: "Which layer of the OSI model handles error detection and correction?",
    options: [
      { text: "Physical Layer", isCorrect: false },
      { text: "Data Link Layer", isCorrect: true },
      { text: "Network Layer", isCorrect: false },
      { text: "Transport Layer", isCorrect: false }
    ],
    explanation: "The Data Link Layer (Layer 2) of the OSI model handles error detection and correction. It ensures that data is reliably transferred between adjacent network nodes by detecting and potentially correcting errors that may occur in the Physical Layer."
  },
  {
    text: "What is the purpose of the ARP protocol?",
    options: [
      { text: "To translate domain names to IP addresses", isCorrect: false },
      { text: "To map IP addresses to MAC addresses", isCorrect: true },
      { text: "To route data packets between different networks", isCorrect: false },
      { text: "To secure data transmission", isCorrect: false }
    ],
    explanation: "ARP (Address Resolution Protocol) is used to map an IP address to a physical MAC (Media Access Control) address on a local network. This mapping is necessary for data to be transmitted on the physical network."
  },
  {
    text: "Which of the following is a characteristic of UDP?",
    options: [
      { text: "Connection-oriented protocol", isCorrect: false },
      { text: "Guaranteed delivery of packets", isCorrect: false },
      { text: "Higher overhead than TCP", isCorrect: false },
      { text: "No acknowledgment of received packets", isCorrect: true }
    ],
    explanation: "UDP (User Datagram Protocol) is a connectionless protocol that does not acknowledge the receipt of packets. It has lower overhead than TCP because it doesn't establish a connection or confirm that packets were delivered successfully."
  },
  {
    text: "What is the purpose of ICMP in networking?",
    options: [
      { text: "To secure data transmission", isCorrect: false },
      { text: "To send error messages and operational information", isCorrect: true },
      { text: "To translate between different network protocols", isCorrect: false },
      { text: "To establish secure connections between hosts", isCorrect: false }
    ],
    explanation: "ICMP (Internet Control Message Protocol) is used for sending error messages and operational information indicating success or failure when communicating with another IP address. The 'ping' utility uses ICMP to test connectivity between hosts."
  },
  {
    text: "What is a MAC address?",
    options: [
      { text: "A logical address assigned by a network administrator", isCorrect: false },
      { text: "A unique identifier assigned to a network interface by the manufacturer", isCorrect: true },
      { text: "A domain name used to identify a website", isCorrect: false },
      { text: "A security feature that controls access to a network", isCorrect: false }
    ],
    explanation: "A MAC (Media Access Control) address is a unique identifier assigned to a network interface controller (NIC) for use as a network address in communications within a network segment. It is assigned by the manufacturer and is typically unchangeable (though it can be spoofed in software)."
  },
  {
    text: "Which protocol is used to securely access a remote server over a network?",
    options: [
      { text: "FTP", isCorrect: false },
      { text: "HTTP", isCorrect: false },
      { text: "Telnet", isCorrect: false },
      { text: "SSH", isCorrect: true }
    ],
    explanation: "SSH (Secure Shell) is a cryptographic network protocol for operating network services securely over an unsecured network. It provides a secure channel over an unsecured network in a client-server architecture, connecting an SSH client with an SSH server."
  },
  {
    text: "What is a firewall in networking?",
    options: [
      { text: "A device that boosts network signals", isCorrect: false },
      { text: "A security system that monitors and controls incoming and outgoing network traffic", isCorrect: true },
      { text: "A protocol for encrypting data", isCorrect: false },
      { text: "A type of network cable", isCorrect: false }
    ],
    explanation: "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It establishes a barrier between a trusted network and an untrusted network, such as the Internet."
  },
  {
    text: "Which of the following correctly describes a router's function?",
    options: [
      { text: "Connects multiple networks and forwards data packets between them", isCorrect: true },
      { text: "Connects multiple devices within a single network", isCorrect: false },
      { text: "Amplifies network signals to extend network range", isCorrect: false },
      { text: "Converts digital signals to analog signals and vice versa", isCorrect: false }
    ],
    explanation: "A router is a networking device that connects multiple networks and forwards data packets between them. It operates at the Network Layer (Layer 3) of the OSI model and uses routing tables to determine the best path for forwarding packets."
  },
  {
    text: "What is the difference between a hub and a switch?",
    options: [
      { text: "A hub is faster than a switch", isCorrect: false },
      { text: "A switch creates a single collision domain, while a hub creates multiple collision domains", isCorrect: false },
      { text: "A hub forwards data to all connected devices, while a switch forwards data only to the intended recipient", isCorrect: true },
      { text: "A hub can store MAC addresses, while a switch cannot", isCorrect: false }
    ],
    explanation: "A hub is a simple networking device that forwards all received data to every device connected to it, creating a single collision domain. A switch, on the other hand, learns the MAC addresses of connected devices and forwards data only to the intended recipient, creating multiple collision domains and improving network efficiency."
  },
  {
    text: "What is a VPN in networking?",
    options: [
      { text: "A physical private network within an organization", isCorrect: false },
      { text: "A virtual connection that provides a secure tunnel through an unsecured network", isCorrect: true },
      { text: "A protocol for voice communication over the internet", isCorrect: false },
      { text: "A type of network topology", isCorrect: false }
    ],
    explanation: "A VPN (Virtual Private Network) extends a private network across a public network, enabling users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network. It provides enhanced privacy and security."
  },
  {
    text: "Which of the following is a characteristic of TCP?",
    options: [
      { text: "Connectionless protocol", isCorrect: false },
      { text: "No guarantee of packet delivery", isCorrect: false },
      { text: "Lower overhead than UDP", isCorrect: false },
      { text: "Establishes a connection before transmitting data", isCorrect: true }
    ],
    explanation: "TCP (Transmission Control Protocol) is a connection-oriented protocol that establishes a connection before transmitting data. It guarantees the delivery of packets, ensures they are delivered in the correct order, and has higher overhead than UDP due to these reliability features."
  },
  {
    text: "What is the purpose of the SMTP protocol?",
    options: [
      { text: "To transfer files between computers", isCorrect: false },
      { text: "To securely browse the web", isCorrect: false },
      { text: "To send email messages", isCorrect: true },
      { text: "To translate domain names to IP addresses", isCorrect: false }
    ],
    explanation: "SMTP (Simple Mail Transfer Protocol) is used for sending email messages between servers. Most email systems that send mail over the Internet use SMTP to send messages from one server to another; the messages can then be retrieved using protocols like POP or IMAP."
  },
  {
    text: "What is packet switching in networking?",
    options: [
      { text: "A method of changing network packets from one format to another", isCorrect: false },
      { text: "A technique for managing network switches", isCorrect: false },
      { text: "A method of grouping data into packets that are transmitted independently", isCorrect: true },
      { text: "A protocol for secure data transmission", isCorrect: false }
    ],
    explanation: "Packet switching is a method of grouping data transmitted over a digital network into packets. Each packet is transmitted individually and can follow different routes to its destination. Once all the packets have arrived at the destination, they are reassembled into the original message."
  },
  {
    text: "What is the purpose of the HTTP protocol?",
    options: [
      { text: "To transfer files between computers", isCorrect: false },
      { text: "To send email messages", isCorrect: false },
      { text: "To transfer hypertext documents", isCorrect: true },
      { text: "To translate domain names to IP addresses", isCorrect: false }
    ],
    explanation: "HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the World Wide Web. It is designed for transferring hypertext documents, such as HTML files, between a client (like a web browser) and a server."
  },
  {
    text: "What is a VLAN in networking?",
    options: [
      { text: "A virtual LAN that groups network devices logically instead of physically", isCorrect: true },
      { text: "A type of wide area network that connects multiple locations", isCorrect: false },
      { text: "A protocol for voice communication over LANs", isCorrect: false },
      { text: "A security mechanism for protecting LANs from external threats", isCorrect: false }
    ],
    explanation: "A VLAN (Virtual Local Area Network) is a logical grouping of network devices that appear to be on the same LAN regardless of their physical location. VLANs improve network performance by reducing broadcast traffic and enhance security by isolating groups of devices."
  },
  {
    text: "Which of the following is NOT a common network topology?",
    options: [
      { text: "Bus topology", isCorrect: false },
      { text: "Star topology", isCorrect: false },
      { text: "Pyramid topology", isCorrect: true },
      { text: "Mesh topology", isCorrect: false }
    ],
    explanation: "Pyramid topology is not a common network topology. Common network topologies include bus, star, ring, mesh, and hybrid topologies, each with its own advantages and disadvantages in terms of cost, reliability, and scalability."
  },
  {
    text: "What is latency in networking?",
    options: [
      { text: "The maximum data transfer rate of a network", isCorrect: false },
      { text: "The delay before a transfer of data begins", isCorrect: true },
      { text: "The amount of data a network can transmit", isCorrect: false },
      { text: "The process of encrypting data for transmission", isCorrect: false }
    ],
    explanation: "Latency in networking refers to the delay before a transfer of data begins following an instruction for its transfer. It is the time taken for a packet to travel from source to destination, often measured in milliseconds, and is a key indicator of network performance."
  },
  {
    text: "What is QoS in networking?",
    options: [
      { text: "A security protocol for protecting network data", isCorrect: false },
      { text: "A mechanism for managing resource usage to provide different priorities to different applications, users, or data flows", isCorrect: true },
      { text: "A type of network topology", isCorrect: false },
      { text: "A method for quantifying server performance", isCorrect: false }
    ],
    explanation: "QoS (Quality of Service) refers to the ability to provide different priorities to different applications, users, or data flows, or to guarantee a certain level of performance to a data flow. It is particularly important for applications like VoIP, online gaming, and streaming media, which require a certain level of reliability and performance."
  },
  {
    text: "Which protocol is used to retrieve email from a mail server?",
    options: [
      { text: "SMTP", isCorrect: false },
      { text: "HTTP", isCorrect: false },
      { text: "FTP", isCorrect: false },
      { text: "POP3/IMAP", isCorrect: true }
    ],
    explanation: "POP3 (Post Office Protocol version 3) and IMAP (Internet Message Access Protocol) are protocols used to retrieve email from a mail server. SMTP is used for sending emails, HTTP is for web browsing, and FTP is for file transfer."
  },
  {
    text: "What is the purpose of the SSL/TLS protocol?",
    options: [
      { text: "To translate domain names to IP addresses", isCorrect: false },
      { text: "To secure data transmission between two systems", isCorrect: true },
      { text: "To route data packets between different networks", isCorrect: false },
      { text: "To assign IP addresses to network devices", isCorrect: false }
    ],
    explanation: "SSL (Secure Sockets Layer) and its successor, TLS (Transport Layer Security), are cryptographic protocols designed to provide secure communication over a computer network. They are widely used in applications like web browsers, email, instant messaging, and VoIP."
  },
  {
    text: "What is the main difference between IPv4 and IPv6?",
    options: [
      { text: "IPv6 uses a 128-bit address, allowing for more addresses than IPv4", isCorrect: true },
      { text: "IPv6 is slower than IPv4", isCorrect: false },
      { text: "IPv6 does not support routing and subnet masking", isCorrect: false },
      { text: "IPv6 is less secure than IPv4", isCorrect: false }
    ],
    explanation: "The main difference between IPv4 and IPv6 is the address size. IPv4 uses a 32-bit address format, allowing for about 4.3 billion addresses, while IPv6 uses a 128-bit address, allowing for approximately 340 undecillion addresses (3.4 × 10^38). This massive increase was necessary due to the depletion of available IPv4 addresses."
  }
]; 