"use client";

import { useState, useCallback, useMemo } from "react";
import {
  generatePassword,
  calculatePasswordStrength,
  getStrengthInfo,
  type PasswordOptions,
} from "@/lib/password-generator";

const initialOptions: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
};

export default function PasswordGeneratorUI() {
  const [length, setLength] = useState<number>(16);
  const [options, setOptions] = useState<PasswordOptions>(initialOptions);
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize password with lazy initializer
  const [password, setPassword] = useState<string>(() => {
    try {
      return generatePassword({ ...initialOptions, length: 16 });
    } catch {
      return "";
    }
  });

  const generateNewPassword = useCallback(() => {
    try {
      const newPassword = generatePassword({ ...options, length });
      setPassword(newPassword);
      setCopied(false);
    } catch (error) {
      console.error("Error generating password:", error);
    }
  }, [options, length]);

  // Calculate strength using useMemo instead of useEffect
  const strength = useMemo(() => {
    if (!password) return 0;
    return calculatePasswordStrength(password, options);
  }, [password, options]);

  const handleCopy = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy password:", error);
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value, 10);
    if (!isNaN(newLength) && newLength >= 6 && newLength <= 32) {
      setLength(newLength);
      setOptions((prev) => ({ ...prev, length: newLength }));
    }
  };

  const handleOptionChange = (key: keyof PasswordOptions) => {
    setOptions((prev) => {
      const newOptions = { ...prev, [key]: !prev[key] };
      // Ensure at least one option is selected
      if (
        !newOptions.includeUppercase &&
        !newOptions.includeLowercase &&
        !newOptions.includeNumbers &&
        !newOptions.includeSymbols
      ) {
        return prev;
      }
      return newOptions;
    });
  };

  const strengthInfo = getStrengthInfo(strength);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Password Generator
          </h1>
          <p className="text-sm text-zinc-400">
            Create strong and secure passwords
          </p>
        </div>

        {/* Password Output */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Your password will appear here"
              className="flex-1 rounded-lg bg-zinc-800/50 border border-zinc-700 px-4 py-3 text-sm font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handleCopy}
              disabled={!password}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          </div>

          {/* Strength Indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Password Strength</span>
                <span
                  className={`font-medium ${
                    strength <= 3
                      ? "text-red-400"
                      : strength <= 6
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {strengthInfo.label}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strengthInfo.color}`}
                  style={{ width: `${(strength / 10) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-300">
              Password Length
            </label>
            <span className="text-sm font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
              {length}
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={handleLengthChange}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>6</span>
            <span>32</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-zinc-300">
            Character Types
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                key: "includeUppercase" as const,
                label: "Uppercase",
                icon: "ABC",
              },
              {
                key: "includeLowercase" as const,
                label: "Lowercase",
                icon: "abc",
              },
              {
                key: "includeNumbers" as const,
                label: "Numbers",
                icon: "123",
              },
              {
                key: "includeSymbols" as const,
                label: "Symbols",
                icon: "!@#",
              },
            ].map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 cursor-pointer hover:bg-zinc-800 transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={options[option.key]}
                  onChange={() => handleOptionChange(option.key)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-200">
                    {option.label}
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    {option.icon}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateNewPassword}
          className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-3 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98]"
        >
          Generate New Password
        </button>
      </div>

      {/* Credit */}
      <div className="mt-6 text-center">
        <p className="text-xs text-zinc-500">
          Created by{" "}
          <span className="text-zinc-400 font-medium">Benyamin Naderi</span>
        </p>
      </div>
    </div>
  );
}
