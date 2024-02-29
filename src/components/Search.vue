<script setup>
import { ref, nextTick } from 'vue';
import useSearchStore from '@/stores/search';
import Loader from '@/components/Loader.vue';
import { getItemIdx } from '@/util/pagination';
import SETTING from '@/setting';

const searchStore = useSearchStore();

const modalItem = ref({});
const isModalActive = ref(false);

async function openModal(item) {
  modalItem.value = { ...item.package };

  await nextTick();

  isModalActive.value = true;
}
</script>

<template>
  <v-text-field
    v-model.trim="searchStore.keyword"
    label="Пошук"
    hide-details="auto"
    :disabled="searchStore.isLoading"
    :loading="searchStore.isTyping"
    autofocus
  />

  <div
    v-if="searchStore.keyword.length"
    class="mt-6"
  >
    <div
      v-if="searchStore.isTyping"
      class="text-center"
    >
      <Loader />
    </div>
    <div v-else>
      <v-table
        v-if="searchStore.currentPageData.length"
        fixed-header
      >
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Назва
            </th>
            <th>
              Версія
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in searchStore.currentPageData"
            :key="item.searchScore"
          >
            <td>
              <span
                class="cursor-pointer"
                @click="openModal(item)"
              >{{ getItemIdx(idx, searchStore.page, SETTING.search.pagination_limit) }}</span>
            </td>
            <td>
              <span
                class="cursor-pointer"
                @click="openModal(item)"
              >{{ item.package.name }}</span>
            </td>
            <td>
              <span
                class="cursor-pointer"
                @click="openModal(item)"
              >{{ item.package.version }}</span>
            </td>
          </tr>
        </tbody>
      </v-table>
      <p v-else>
        По Вашому запиту нічого не знайдено.
      </p>

      <v-pagination
        v-if="searchStore.currentPageData.length"
        v-model="searchStore.page"
        :length="searchStore.currentKeywordPageCount"
        class="mt-4"
      />
    </div>
  </div>
  <div
    v-else
    class="mt-6"
  >
    <p>Введіть пошуковий запит.</p>
  </div>

  <v-dialog
    v-model="isModalActive"
    max-width="800"
  >
    <v-card title="Детальні відомості">
      <v-card-text>
        <v-table fixed-header>
          <tbody>
            <tr>
              <td><strong>Назва</strong></td>
              <td>{{ modalItem.name }}</td>
            </tr>
            <tr>
              <td><strong>Версія</strong></td>
              <td>{{ modalItem.version }}</td>
            </tr>
            <tr>
              <td><strong>Автор</strong></td>
              <td>{{ modalItem.author?.name || modalItem.publisher?.username }}</td>
            </tr>
            <tr v-if="modalItem.description">
              <td><strong>Короткий опис</strong></td>
              <td>{{ modalItem.description }}</td>
            </tr>
            <tr v-if="modalItem.keywords?.length">
              <td><strong>Ключові слова</strong></td>
              <td>{{ modalItem.keywords.join(', ') }}</td>
            </tr>
            <tr>
              <td><strong>Посилання</strong></td>
              <td>
                <a
                  :href="`https://www.npmjs.com/package/${modalItem.name}`"
                  target="_blank"
                >Відкрити у новому вікні</a>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          text="Закрити"
          variant="tonal"
          @click="isModalActive = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
</style>
