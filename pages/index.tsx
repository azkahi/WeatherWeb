import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Flex, Text } from "@radix-ui/themes"
import { Command } from "cmdk"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import PageViewModel from "app/viewmodels/pageViewModel"
import DropdownAutoComplete from "components/Dropdown/AutoComplete"
import RootLayout from "components/layout"
import SearchBar from "components/SearchBar/SearchBar"

export const getStaticProps = (async () => {
  const BASE_URL = process.env.LOCAL_BASE_URL?.toString() ?? ""
  return { props: { BASE_URL } }
}) satisfies GetStaticProps<{
  BASE_URL: string
}>

export default function Index({ BASE_URL }: InferGetStaticPropsType<typeof getStaticProps>) {
  const viewModel = PageViewModel(BASE_URL)

  return viewModel.render ? (
    <RootLayout>
      <Flex className="h-full w-full">
        <Flex className="flex flex-col items-center justify-center p-4 gap-4">
          <Text className="text-2xl font-bold">Search City</Text>
          <Command label="Search City" value={viewModel.city}>
          <Command.Input value={viewModel.query} onValueChange={viewModel.onChangeText} onFocus={viewModel.onSearchBarFocus} onBlur={viewModel.onSearchBarBlur} className="flex flex-row items-center gap-4 p-4 border rounded" />
            <Command.List className="gap border">
              <DropdownAutoComplete items={viewModel.cities} onClick={viewModel.onClickAutoComplete}/>
            </Command.List>
          </Command>
        </Flex>
      </Flex>
    </RootLayout>
  ) : null
}
