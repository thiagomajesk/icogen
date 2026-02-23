import {
  Accordion,
  ActionIcon,
  Button,
  Checkbox,
  ColorInput,
  Divider,
  Group,
  NumberInput,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconColorPicker,
  IconFlipHorizontal,
  IconFlipVertical,
  IconRotate2,
  IconRotateClockwise2,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import { defaultBackground, defaultForeground } from "../core/constants";
import {
  isDefaultBackgroundStyle,
  isDefaultForegroundStyle,
} from "../core/style-state";
import type { BackgroundStyleState, ForegroundStyleState } from "../core/types";
import { STYLE_SHAPE_OPTIONS } from "./style-shapes";

interface SelectedIconStylePanelProps {
  background: BackgroundStyleState;
  canBreakApartPaths: boolean;
  foreground: ForegroundStyleState;
  foregroundPathOptions: Array<{ id: string; label: string }>;
  onBackgroundChange: (background: BackgroundStyleState) => void;
  onBreakApartPaths: () => void;
  onResetBreakApartPaths: () => void;
  onCycleForegroundPath: (direction: 1 | -1) => void;
  onDeselectIcon: () => void;
  onForegroundChange: (foreground: ForegroundStyleState) => void;
  selectedForegroundPathId: string | null;
  isPathsBrokenApart: boolean;
}

const typeOptions = [
  { value: "none", label: "None" },
  { value: "flat", label: "Flat" },
  { value: "gradient", label: "Gradient" },
];

const gradientOptions = [
  { value: "radial", label: "Radial" },
  { value: "horizontal", label: "Horizontal →" },
  { value: "vertical", label: "Vertical ↓" },
  { value: "diagonal-forward", label: "Diagonal ↘" },
  { value: "diagonal-backward", label: "Diagonal ↗" },
];

const strokeOptions = [
  { value: "none", label: "None" },
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
];

const eyeDropperIcon = <IconColorPicker size={14} stroke={1.8} />;

function toNumber(value: string | number, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

interface LabeledSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

function LabeledSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: LabeledSliderProps) {
  return (
    <Stack gap={4}>
      <Group justify="space-between" gap="xs">
        <Text size="sm" fw={500}>
          {label}
        </Text>
        <Text size="xs" c="dimmed">
          {value}
        </Text>
      </Group>
      <Slider
        label={null}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </Stack>
  );
}

function pathCounterLabel(
  selectedForegroundPathId: string | null,
  foregroundPathOptions: Array<{ id: string; label: string }>,
): string {
  if (foregroundPathOptions.length === 0) {
    return "0/0";
  }

  const index = foregroundPathOptions.findIndex(
    (option) => option.id === selectedForegroundPathId,
  );

  return `${Math.max(1, index + 1)}/${foregroundPathOptions.length}`;
}

export function SelectedIconStylePanel({
  background,
  canBreakApartPaths,
  foreground,
  foregroundPathOptions,
  onBackgroundChange,
  onBreakApartPaths,
  onResetBreakApartPaths,
  onCycleForegroundPath,
  onDeselectIcon,
  onForegroundChange,
  selectedForegroundPathId,
  isPathsBrokenApart,
}: SelectedIconStylePanelProps) {
  const isBackgroundDefault = isDefaultBackgroundStyle(background);
  const isForegroundDefault = isDefaultForegroundStyle(foreground);
  const isBackgroundStrokeDisabled = background.strokeStyle === "none";

  return (
    <Stack h="100%" gap="sm" style={{ minHeight: 0 }}>
      <Group justify="space-between" align="center">
        <Text fw={700}>Editor</Text>
        <ActionIcon
          variant="default"
          aria-label="Back to icon search"
          onClick={onDeselectIcon}
        >
          <IconArrowLeft size={16} />
        </ActionIcon>
      </Group>

      <ScrollArea
        style={{ flex: 1, minHeight: 0 }}
        type="auto"
        scrollbars="y"
        offsetScrollbars="present"
        viewportProps={{ style: { paddingRight: 20 } }}
      >
        <Accordion
          defaultValue={["background", "foreground"]}
          multiple
          variant="separated"
          radius="md"
          styles={{
            item: {
              backgroundColor: "var(--mantine-color-dark-6)",
              borderColor: "var(--mantine-color-dark-4)",
              overflow: "hidden",
            },
            panel: {
              backgroundColor: "var(--mantine-color-dark-7)",
              paddingTop: "var(--mantine-spacing-xs)",
              paddingBottom: "var(--mantine-spacing-xs)",
            },
          }}
        >
            <Accordion.Item value="background">
              <Accordion.Control>
                <Text fw={600}>Background</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="sm">
                  <Select
                    label="Type"
                    data={typeOptions}
                    value={background.type}
                    allowDeselect={false}
                    onChange={(value) => {
                      const nextType = (value ?? "none") as BackgroundStyleState["type"];
                      if (background.type === "flat" && nextType === "gradient") {
                        onBackgroundChange({
                          ...background,
                          type: nextType,
                          gradientFrom: background.flatColor,
                        });
                        return;
                      }

                      onBackgroundChange({
                        ...background,
                        type: nextType,
                      });
                    }}
                  />

                  {background.type === "flat" ? (
                    <ColorInput
                      label="Color"
                      format="hexa"
                      eyeDropperIcon={eyeDropperIcon}
                      value={background.flatColor}
                      onChange={(value) =>
                        onBackgroundChange({
                          ...background,
                          flatColor: value,
                        })
                      }
                    />
                  ) : null}

                  {background.type === "gradient" ? (
                    <>
                      <Select
                        label="Gradient"
                        data={gradientOptions}
                        value={background.gradientType}
                        allowDeselect={false}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            gradientType:
                              (value ?? "radial") as BackgroundStyleState["gradientType"],
                          })
                        }
                      />
                      <ColorInput
                        label="From"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={background.gradientFrom}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            gradientFrom: value,
                          })
                        }
                      />
                      <ColorInput
                        label="To"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={background.gradientTo}
                        onChange={(value) =>
                          onBackgroundChange({
                            ...background,
                            gradientTo: value,
                          })
                        }
                      />
                    </>
                  ) : null}

                  <Select
                    label="Shape"
                    data={STYLE_SHAPE_OPTIONS.map((option) => ({
                      value: option.value,
                      label: option.label,
                    }))}
                    value={background.shape}
                    allowDeselect={false}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        shape: (value ?? "circle") as BackgroundStyleState["shape"],
                      })
                    }
                  />

                  <Select
                    label="Stroke"
                    data={strokeOptions}
                    value={background.strokeStyle}
                    allowDeselect={false}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        strokeStyle: (value ?? "none") as BackgroundStyleState["strokeStyle"],
                      })
                    }
                  />

                  <NumberInput
                    label="Stroke Width"
                    min={0}
                    max={64}
                    step={1}
                    disabled={isBackgroundStrokeDisabled}
                    value={background.frameWidth}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameWidth: Math.max(0, toNumber(value, background.frameWidth)),
                      })
                    }
                  />

                  <ColorInput
                    label="Stroke Color"
                    format="hexa"
                    eyeDropperIcon={eyeDropperIcon}
                    disabled={isBackgroundStrokeDisabled}
                    value={background.frameColor}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameColor: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Rotate"
                    value={background.frameRotate}
                    min={-180}
                    max={180}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameRotate: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Scale"
                    value={background.frameScale}
                    min={1}
                    max={100}
                    onChange={(value) =>
                      onBackgroundChange({
                        ...background,
                        frameScale: value,
                      })
                    }
                  />

                  <Button
                    variant="default"
                    fullWidth
                    leftSection={<IconRotate2 size={16} />}
                    disabled={isBackgroundDefault}
                    onClick={() => onBackgroundChange(defaultBackground)}
                  >
                    Reset background
                  </Button>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="foreground">
              <Accordion.Control>
                <Text fw={600}>Foreground</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="sm">
                  <Group justify="space-between" align="center">
                    <Text fw={500}>Paths</Text>
                    {!isPathsBrokenApart ? (
                      <Button
                        variant="default"
                        disabled={!canBreakApartPaths}
                        onClick={onBreakApartPaths}
                      >
                        Break apart
                      </Button>
                    ) : (
                      <Group gap={6}>
                        <ActionIcon
                          variant="default"
                          aria-label="Previous foreground path"
                          disabled={foregroundPathOptions.length === 0}
                          onClick={() => onCycleForegroundPath(-1)}
                        >
                          <IconChevronLeft size={16} />
                        </ActionIcon>
                        <Text size="sm" c="dimmed" w={52} ta="center">
                          {pathCounterLabel(selectedForegroundPathId, foregroundPathOptions)}
                        </Text>
                        <ActionIcon
                          variant="default"
                          aria-label="Next foreground path"
                          disabled={foregroundPathOptions.length === 0}
                          onClick={() => onCycleForegroundPath(1)}
                        >
                          <IconChevronRight size={16} />
                        </ActionIcon>
                      </Group>
                    )}
                  </Group>

                  {!isPathsBrokenApart ? (
                    <>
                      <Text size="sm" c="dimmed">
                        You can break the SVG to customize its individual paths.
                      </Text>
                      <Divider />
                    </>
                  ) : null}

                  <Select
                    label="Type"
                    data={typeOptions}
                    value={foreground.type}
                    allowDeselect={false}
                    onChange={(value) => {
                      const nextType = (value ?? "none") as ForegroundStyleState["type"];
                      if (foreground.type === "flat" && nextType === "gradient") {
                        onForegroundChange({
                          ...foreground,
                          type: nextType,
                          gradientFrom: foreground.flatColor,
                        });
                        return;
                      }

                      onForegroundChange({
                        ...foreground,
                        type: nextType,
                      });
                    }}
                  />

                  {foreground.type === "flat" ? (
                    <ColorInput
                      label="Color"
                      format="hexa"
                      eyeDropperIcon={eyeDropperIcon}
                      value={foreground.flatColor}
                      onChange={(value) =>
                        onForegroundChange({
                          ...foreground,
                          flatColor: value,
                        })
                      }
                    />
                  ) : null}

                  {foreground.type === "gradient" ? (
                    <>
                      <Select
                        label="Gradient"
                        data={gradientOptions}
                        value={foreground.gradientType}
                        allowDeselect={false}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            gradientType:
                              (value ?? "radial") as ForegroundStyleState["gradientType"],
                          })
                        }
                      />
                      <ColorInput
                        label="From"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={foreground.gradientFrom}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            gradientFrom: value,
                          })
                        }
                      />
                      <ColorInput
                        label="To"
                        format="hexa"
                        eyeDropperIcon={eyeDropperIcon}
                        value={foreground.gradientTo}
                        onChange={(value) =>
                          onForegroundChange({
                            ...foreground,
                            gradientTo: value,
                          })
                        }
                      />
                    </>
                  ) : null}

                  <Text fw={500}>Transform</Text>
                  <Group gap="xs">
                    <Tooltip label="Flip horizontally">
                      <ActionIcon
                        variant={foreground.flipX ? "filled" : "default"}
                        aria-label="Flip horizontally"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            flipX: !foreground.flipX,
                          })
                        }
                      >
                        <IconFlipHorizontal size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Flip vertically">
                      <ActionIcon
                        variant={foreground.flipY ? "filled" : "default"}
                        aria-label="Flip vertically"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            flipY: !foreground.flipY,
                          })
                        }
                      >
                        <IconFlipVertical size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Rotate +15°">
                      <ActionIcon
                        variant="default"
                        aria-label="Rotate clockwise 15 degrees"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameRotate: foreground.frameRotate + 15,
                          })
                        }
                      >
                        <IconRotateClockwise2 size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Rotate −15°">
                      <ActionIcon
                        variant="default"
                        aria-label="Rotate counter-clockwise 15 degrees"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameRotate: foreground.frameRotate - 15,
                          })
                        }
                      >
                        <IconRotate2 size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Zoom −10%">
                      <ActionIcon
                        variant="default"
                        aria-label="Zoom out 10%"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameScale: Math.max(1, foreground.frameScale - 10),
                          })
                        }
                      >
                        <IconZoomOut size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Zoom +10%">
                      <ActionIcon
                        variant="default"
                        aria-label="Zoom in 10%"
                        onClick={() =>
                          onForegroundChange({
                            ...foreground,
                            frameScale: Math.min(200, foreground.frameScale + 10),
                          })
                        }
                      >
                        <IconZoomIn size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>

                  <LabeledSlider
                    label="Position X"
                    value={foreground.positionX}
                    min={-100}
                    max={100}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        positionX: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Position Y"
                    value={foreground.positionY}
                    min={-100}
                    max={100}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        positionY: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Skew X"
                    value={foreground.skewX}
                    min={-45}
                    max={45}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        skewX: value,
                      })
                    }
                  />

                  <LabeledSlider
                    label="Skew Y"
                    value={foreground.skewY}
                    min={-45}
                    max={45}
                    onChange={(value) =>
                      onForegroundChange({
                        ...foreground,
                        skewY: value,
                      })
                    }
                  />

                  <Checkbox
                    checked={foreground.clipToBackground}
                    onChange={(event) =>
                      onForegroundChange({
                        ...foreground,
                        clipToBackground: event.currentTarget.checked,
                      })
                    }
                    label="Clip to background shape"
                  />

                  <Button
                    variant="default"
                    fullWidth
                    leftSection={<IconRotate2 size={16} />}
                    disabled={isForegroundDefault && !isPathsBrokenApart}
                    onClick={() => {
                      onForegroundChange(defaultForeground);
                      if (isPathsBrokenApart) {
                        onResetBreakApartPaths();
                      }
                    }}
                  >
                    Reset foreground
                  </Button>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
      </ScrollArea>
    </Stack>
  );
}
