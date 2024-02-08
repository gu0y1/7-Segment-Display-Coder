document.addEventListener('DOMContentLoaded', () => {
  // Attach event listeners to segment buttons
  document.querySelectorAll('.segment-button, .dp-button').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // Attach event listeners to anode buttons
  document.querySelectorAll('.an-button').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // Generate Verilog button
  document.getElementById('generate').addEventListener('click', generateVerilogCode);

  // Generate XDC button
  document.getElementById('generateXDC').addEventListener('click', generateXDCCode);
});

function generateVerilogCode() {
  let segValues = Array(7).fill(1); // Defaults for segments (1 for common anode)
  let dpValue = 1; // Default for decimal point
  let anValues = Array(4).fill(1); // Defaults for anodes

  // Check active segments and update segValues
  document.querySelectorAll('.segment-button.active').forEach(btn => {
    const segmentIndex = 'ABCDEFG'.indexOf(btn.dataset.segment);
    segValues[segmentIndex] = 0; // Segment is on
  });

  // Check if decimal point is active
  if (document.querySelector('.dp-button.active')) {
    dpValue = 0; // Decimal point is on
  }

  // Check active anodes and update anValues
  document.querySelectorAll('.an-button.active').forEach(btn => {
    const anodeIndex = parseInt(btn.dataset.anode.substring(2), 10);
    anValues[anodeIndex] = 0; // Anode is on
  });

  // Generate Verilog code
  let verilogAssignments = `module main (
  output [6:0] seg,  // 7-segment display segments (a-g)
  output dp,         // Decimal point
  output [3:0] an    // 7-segment display anodes (AN0-AN3)
);\n\n`;

  // Assignments for segments
  segValues.forEach((value, index) => {
    verilogAssignments += `assign seg[${index}] = ${value}; // Segment ${'ABCDEFG'[index]}\n`;
  });

  // Assignment for decimal point
  verilogAssignments += `assign dp = ${dpValue}; // Decimal point\n`;

  // Assignments for anodes
  anValues.forEach((value, index) => {
    verilogAssignments += `assign an[${index}] = ${value}; // AN${index}\n`;
  });

  verilogAssignments += "\nendmodule";

  // Display generated code
  document.getElementById('verilogCode').textContent = verilogAssignments;
}

function generateXDCCode() {
  const xdcContent = `##7 Segment Display
set_property -dict { PACKAGE_PIN W7   IOSTANDARD LVCMOS33 } [get_ports {seg[0]}]
set_property -dict { PACKAGE_PIN W6   IOSTANDARD LVCMOS33 } [get_ports {seg[1]}]
set_property -dict { PACKAGE_PIN U8   IOSTANDARD LVCMOS33 } [get_ports {seg[2]}]
set_property -dict { PACKAGE_PIN V8   IOSTANDARD LVCMOS33 } [get_ports {seg[3]}]
set_property -dict { PACKAGE_PIN U5   IOSTANDARD LVCMOS33 } [get_ports {seg[4]}]
set_property -dict { PACKAGE_PIN V5   IOSTANDARD LVCMOS33 } [get_ports {seg[5]}]
set_property -dict { PACKAGE_PIN U7   IOSTANDARD LVCMOS33 } [get_ports {seg[6]}]

set_property -dict { PACKAGE_PIN V7   IOSTANDARD LVCMOS33 } [get_ports {dp}]

set_property -dict { PACKAGE_PIN U2   IOSTANDARD LVCMOS33 } [get_ports {an[0]}]
set_property -dict { PACKAGE_PIN U4   IOSTANDARD LVCMOS33 } [get_ports {an[1]}]
set_property -dict { PACKAGE_PIN V4   IOSTANDARD LVCMOS33 } [get_ports {an[2]}]
set_property -dict { PACKAGE_PIN W4   IOSTANDARD LVCMOS33 } [get_ports {an[3]}]`;

  // Display XDC content
  document.getElementById('xdcCode').textContent = xdcContent;
}
