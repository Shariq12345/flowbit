import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface CredentialIdProps {
  params: Promise<{ credentialId: string }>;
}

const CredentialId = async ({ params }: CredentialIdProps) => {
  await requireAuth();
  const { credentialId } = await params;

  return <div>CredentialId: {credentialId}</div>;
};

export default CredentialId;
