"use client";

import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useRemoveCredential,
  useSuspenseCredentials,
} from "../hooks/use-credentials";
import { useRouter } from "next/navigation";
import { useCredentialsParams } from "../hooks/use-credentials-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

import type { Credential } from "@/lib/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export const CredentialsSearch = () => {
  const [params, setParams] = useCredentialsParams();

  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search credentials"
    />
  );
};

export const CredentialsList = () => {
  const credentials = useSuspenseCredentials();

  return (
    <EntityList
      items={credentials.data.items}
      getKey={(credential) => credential.id}
      renderItems={(credential) => <CredentialItem data={credential} />}
      emptyView={<CredentialsEmpty />}
    />
  );
};

export const CredentialsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();

  return (
    <EntityHeader
      title="Credentials"
      description="Create and manage your credentials."
      newButtonHref={"/credentials/new"}
      newButtonLabel="New Credential"
      disabled={disabled}
    />
  );
};

export const CredentialsPagination = () => {
  const credentials = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  return (
    <EntityPagination
      onPageChange={(page) => setParams({ ...params, page })}
      disabled={credentials.isFetching}
      totalPages={credentials.data.totalPages}
      page={credentials.data.page}
    />
  );
};

export const CredentialsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch />}
      pagination={<CredentialsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const CredentialsLoading = () => {
  return <LoadingView message="Loading credentials..." />;
};

export const CredentialsErrorLoading = () => {
  return <ErrorView message="Error loading credentials..." />;
};

export const CredentialsEmpty = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push(`credentials/new`);
  };

  return (
    <EmptyView
      onNew={handleCreate}
      message="You haven't created any credentials yet"
    />
  );
};

const credentialLogos: Record<string, string> = {
  OPENAI: "/openai.svg",
  ANTHROPIC: "/anthropic.svg",
  GEMINI: "/gemini.svg",
};

export const CredentialItem = ({ data }: { data: Credential }) => {
  const removeCredential = useRemoveCredential();

  const handleRemove = () => {
    removeCredential.mutate({ id: data.id });
  };

  const logo = credentialLogos[data.type] || "/logos/openai.svg";

  return (
    <EntityItem
      href={`/credentials/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt)} ago &bull; Created{" "}
          {formatDistanceToNow(data.createdAt)} ago
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <Image src={logo} alt={data.type} width={20} height={20} />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeCredential.isPending}
    />
  );
};
