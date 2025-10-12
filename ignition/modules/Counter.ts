import { buildModule, ModuleBuilder } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CounterModule", (m: ModuleBuilder) => {
  const counter = m.contract("Counter");

  m.call(counter, "incBy", [5n]);

  return { counter };
});
